import Axios from 'axios';
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

    Axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SERVER_KEY}&response=${reCaptcha}`,
      {
        secret: process.env.REACT_APP_SERVER_KEY,
        reCaptcha,
      }
    )
      .then((responseFromGoogle) => {
        // Check the response from the server
        if (responseFromGoogle.data.success) {
          console.log('captcha works!');
          db('users')
            .insert({
              email: mail,
              last_name: lastName,
              first_name: firstName,
              password: password,
            })
            .then(() => {
              console.log('Hell yeah!');
              response.status(200);
              welcomeMail(mail, firstName, lastName);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
