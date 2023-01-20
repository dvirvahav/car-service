import Axios from 'axios';
import { Response, Request, response } from 'express';
import { Knex } from 'knex';
import { reCaptchaService } from '../services/recaptcha.service';

export const loginController =
  (db: Knex<any, unknown[]>) =>
  (request: Request, responseToClient: Response) => {
    const {
      email,
      password,
      reCaptcha,
    }: { email: string; password: string; reCaptcha: string } = request.body;
    console.log('Login');
    // Send a request to the Google reCAPTCHA server to verify the response
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
          db.select()
            .from('users')
            .where({ email: email, password: password })
            .then((rows) => {
              if (rows.length) {
                db.select()
                  .from('treatments')
                  .where('user_email', email)
                  .then((rows) => {
                    console.log('Found user! sending data....');
                    responseToClient.status(200).send(rows);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log('email and password do not exist');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else console.log('captcha not working!');
      })
      .catch((error) => {
        console.log(error);
      });
  };
