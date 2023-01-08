import { Transporter, createTransport } from 'nodemailer';

const mailService: Transporter = createTransport({
  service: 'outlook',
  auth: {
    user: process.env.MAIL,
    pass: process.env.DB_PASSWORD,
  },

  tls: {
    ciphers: 'SSLv3',
  },
});
export const welcomeMail = (
  clientMail: string,
  firstName: string,
  lastName: string
) => {
  mailService.sendMail({
    from: process.env.MAIL,
    to: clientMail,
    subject: 'Welcome to Our Car Service Site!',
    html: `
    <h1>Congratulations ${
      firstName + ' ' + lastName
    }! your account has been created successfully!</h1>
    <p>Thank you for choosing our car service site to take care of all of your vehicle needs. We're excited to have you on board and can't wait to get started.</p>
    <p>Here's a quick overview of what you can expect:</p>
    <ul>
      <li>Expert, professional service from our team of certified technicians</li>
      <li>Competitive pricing on all of our services and parts</li>
      <li>Convenient appointment scheduling and pick-up/drop-off options</li>
      <li>Transparent communication throughout the repair process</li>
    </ul>
    <p>Thank you again for your business. If you have any questions or concerns, don't hesitate to reach out to us at any time.</p>
    <p>Best regards,</p>
    <p>The Car Service Site Team</p>
  `,
  });
};
