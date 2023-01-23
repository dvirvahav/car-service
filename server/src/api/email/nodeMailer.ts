import { Transporter, createTransport } from 'nodemailer';
import { Response } from 'express';
export const mailService: Transporter = createTransport({
  service: 'outlook',
  auth: {
    user: process.env.MAIL_SERVICE,
    pass: process.env.DB_PASSWORD,
  },

  tls: {
    ciphers: 'SSLv3',
  },
});
export const sendContactEmail = (
  clientMail: string,
  firstName: string,
  lastName: string,
  response: Response,
  contactComment: string
) => {
  mailService
    .sendMail({
      from: clientMail,
      to: process.env.MAIL_SERVICE,
      subject: `Contact Us mail has been submitted${clientMail}`,
      html: `
      <h1> Msg from ${firstName} ${lastName}
      <p>${contactComment}<p/>

`,
    })
    .then(() => {
      console.log('Mail has been sent successfully!');
      response.status(200).send();
    })
    .catch((error) => {
      console.log('Error sending mail .. ' + error);
      response.status(400).send(error);
    });
};
export const welcomeMail = (
  clientMail: string,
  firstName: string,
  lastName: string,
  response: Response
) => {
  mailService
    .sendMail({
      from: process.env.MAIL_SERVICE,
      to: clientMail,
      subject: 'Welcome to Our Car Service Site!',
      html: `
    <h1>Congratulations ${
      firstName + ' ' + lastName
    }! your account has been created successfully!</h1> <br/>
    <img src='https://i.ibb.co/YN483kn/logo.png' alt='center image' /><br/>
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
    })
    .then(() => {
      response.status(200).send();
      console.log('Mail has been sent successfully');
    })
    .catch((error) => {
      console.log(`Mail hasn't been sent successfully`);
      response.status(400).send(`Mail hasn't been sent successfully`);
    });
};

export const sendPasswordResetEmail = (
  clientMail: string,
  token: string,
  response: Response
) => {
  mailService
    .sendMail({
      from: process.env.MAIL_SERVICE,
      to: clientMail,
      subject: `Password Reset Request for ${clientMail}`,
      html: `
      <img src='https://i.ibb.co/YN483kn/logo.png' alt='center image' /><br/>
<p> We received a request to reset the password for your account. If you made this request, 
please follow the instructions below to reset your password.</p>
<p>Here's a quick overview of what you can expect:</p>
<ul>
<li>Click on the following link to access the password reset page: https://car-service-dvirvahav.vercel.app//resetPassword/${token}</li>
<li>Enter your email address and the new password you would like to use.</li>
<li>Click "Reset Password" to complete the process.</li>
</ul>
<p>If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
<p>Thank you,</p>
<p>The Car Service Site Team</p>
`,
    })
    .then(() => {
      console.log('Mail has been sent successfully!');
      response.status(200).send();
    })
    .catch((error) => {
      console.log('Error sending mail .. ' + error);
      response.status(400).send(error);
    });
};
