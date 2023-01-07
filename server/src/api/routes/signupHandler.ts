import { Request, Response } from 'express';
import { Knex } from 'knex';

export const signupHandler =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;

    db('users')
      .insert({
        email: mail,
        last_name: lastName,
        first_name: firstName,
        password: password,
      })
      .then(() => {
        response.status(200);
      })
      .catch((err) => {
        console.error(err);
      });
  };
