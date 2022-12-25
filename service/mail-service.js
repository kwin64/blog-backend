const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Activation account in ${process.env.API_URL}`,
        text: '',
        html: `
        <div>
          <h1>Click here</h1>
          <a href='${link}'>${link}</a>
        </div>
      `,
      })
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  }
}
module.exports = new MailService();
