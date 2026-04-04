import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from 'src/habitaciones/habitaciones.entity';
import { Reserva } from './reservas.entity';
import { User } from 'src/user/user.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class ReservasService {
  private readonly stripe: any | null;

  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepo: Repository<Reserva>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Habitacion)
    private readonly habitacionRepo: Repository<Habitacion>,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      this.stripe = null;
      return;
    }

    try {
      this.stripe = new (Stripe as any)(stripeSecretKey);
    } catch {
      this.stripe = (Stripe as any)(stripeSecretKey);
    }
  }

  async createReserva(dto: CreateReservaDto): Promise<Reserva> {
    if (dto.fechainicio > dto.fechafin) {
      throw new BadRequestException(
        'La fechainicio no puede ser mayor que la fechafin',
      );
    }

    const reservaSolapada = await this.reservaRepo
      .createQueryBuilder('reserva')
      .where('reserva.idhabitacion = :idhabitacion', {
        idhabitacion: dto.idhabitacion,
      })
      .andWhere('reserva.fecha_inicio IS NOT NULL')
      .andWhere('reserva.fecha_fin IS NOT NULL')
      .andWhere(':fechainicio <= reserva.fecha_fin', {
        fechainicio: dto.fechainicio,
      })
      .andWhere(':fechafin >= reserva.fecha_inicio', {
        fechafin: dto.fechafin,
      })
      .getOne();

    if (reservaSolapada) {
      throw new BadRequestException(
        'La habitacion ya tiene una reserva en ese rango de fechas',
      );
    }

    const usuario = await this.userRepo.findOne({ where: { id: dto.idusuario } });
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    const habitacion = await this.habitacionRepo.findOne({
      where: { id: dto.idhabitacion },
    });
    if (!habitacion) {
      throw new NotFoundException('La habitacion no existe');
    }

    const precioPorNoche = Number(habitacion.precio);
    if (Number.isNaN(precioPorNoche) || precioPorNoche <= 0) {
      throw new BadRequestException('La habitacion no tiene un precio valido');
    }

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferencia = dto.fechafin.getTime() - dto.fechainicio.getTime();
    const noches = Math.max(1, Math.ceil(diferencia / milisegundosPorDia));
    const montoTotal = Number((precioPorNoche * noches).toFixed(2));

    const moneda =
      this.configService.get<string>('STRIPE_CURRENCY')?.toLowerCase() ?? 'usd';
    const montoEnCentavos = Math.round(montoTotal * 100);

    if (!this.stripe) {
      throw new InternalServerErrorException(
        'Stripe no esta configurado. Define STRIPE_SECRET_KEY en .env',
      );
    }

    let paymentIntent: any;
    try {
      paymentIntent = await this.stripe.paymentIntents.create({
        amount: montoEnCentavos,
        currency: moneda,
        confirm: true,
        payment_method: dto.paymentMethodId,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        receipt_email: usuario.email,
        description: `Reserva habitacion ${habitacion.numHabitacion}`,
        metadata: {
          idusuario: String(usuario.id),
          idhabitacion: String(habitacion.id),
          fechainicio: dto.fechainicio.toISOString(),
          fechafin: dto.fechafin.toISOString(),
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Stripe no pudo procesar el pago';

      throw new BadRequestException(`Error al procesar el pago: ${message}`);
    }

    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestException(
        `El pago no se completo. Estado actual: ${paymentIntent.status}`,
      );
    }

    const reserva = this.reservaRepo.create({
      idUsuario: usuario,
      idHabitacion: habitacion,
      fechaInicio: dto.fechainicio,
      fechaFin: dto.fechafin,
      montoTotal,
      moneda,
      estadoPago: 'pagado',
      stripePaymentIntentId: paymentIntent.id,
    });

    try {
      return await this.reservaRepo.save(reserva);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo guardar la reserva';
      throw new InternalServerErrorException(
        `Error al guardar la reserva: ${message}`,
      );
    }
  }
}
