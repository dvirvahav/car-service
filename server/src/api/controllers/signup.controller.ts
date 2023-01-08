import { Request, Response } from 'express';
import { Knex } from 'knex';
import { welcomeMail } from '../email/nodeMailer';
import { reCaptchaService } from '../services/recaptcha.service';

export const signupController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;
    const reCaptcha: string = request.body.reCaptcha;
    reCaptchaService(reCaptcha) === 'success'
      ? db('users')
          .insert({
            email: mail,
            last_name: lastName,
            first_name: firstName,
            password: password,
            reCaptcha: reCaptcha,
          })
          .then(() => {
            response.status(200);
            welcomeMail(mail, firstName, lastName);
          })
          .catch((err) => {
            console.error(err);
          })
      : response.status(500).send('Captcha is Wrong!');
  };
