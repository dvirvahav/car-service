import { Knex } from 'knex';
import { generateToken } from '../util/generateToken';
import { Request, Response } from 'express';
import { Axios } from 'axios';
import { sendPasswordResetEmail } from '../email/nodeMailer';

export const resetPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const email: string = request.body.mail;
    const token: string = generateToken();

    db('users')
      .where({ email })
      .update({ reset_token: token })
      .then((numUpdated) => {
        if (numUpdated === 0) response.send('User not found!');
        else {
          sendPasswordResetEmail(email, token) === 'success'
            ? response.status(200).send('Mail has been sent successfully!')
            : response.status(400).send('Login error credentials');
        }
      });
  };

export const setNewPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const { token } = request.params;
    const { password } = request.body;

    db('users')
      .first()
      .where({ reset_token: token })

      .then((user) => {
        if (!user) {
          response.status(400).send({ error: 'Token not found' });
          console.log('no such user!');
        } else {
          db('users')
            .where({ reset_token: token })
            .update({ password: password, reset_token: null })
            .returning('*')
            .then((updatedResults) => {
              console.log(updatedResults);
              response.send({ success: true });
            });
        }
      })

      .catch((err) => {
        console.error('here' + err);
        response.status(500).send({ error: 'Error finding user' });
      });
  };
