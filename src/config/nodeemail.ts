import * as nodemailer from 'nodemailer';

export class confignodeemail {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.mail,
        pass: process.env.mailPass,
      },
    });
  }
  
  async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}
