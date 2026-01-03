import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmRegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'El token es obligatorio' })
    token: string;
}
