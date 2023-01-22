import { Knex } from 'knex';
import { generateToken } from '../util/generateToken';
import { Request, Response } from 'express';
import { Axios } from 'axios';
import { mailService, sendPasswordResetEmail } from '../email/nodeMailer';

export const resetPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const email: string = request.body.mail;
    const token: string = generateToken();
    console.log(`Resetting ${email} with token...`);
    db('users')
      .where({ email })
      .update({ reset_token: token })
      .then((numUpdated) => {
        if (numUpdated === 0) response.status(404).send('User not found!');
        else {
          sendPasswordResetEmail(email, token, response);
        }
      })
      .catch(() => {
        console.log('Something went wrong with insert the token ');
        response.status(400).send('Something went wrong with insert the token');
      });
  };

export const setNewPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const { token } = request.params;
    const { password } = request.body;
    console.log('Setting new password...');
    db('users')
      .first()
      .where({ reset_token: token })
      .then((user) => {
        if (!user) {
          response.status(400).send({ error: 'Token not found' });
          console.log('no such user!');
        } else {
          console.log('Found user, updating token...');
          db('users')
            .where({ reset_token: token })
            .update({ password: password, reset_token: null })
            .returning('*')
            .then(() => {
              console.log('Token updated successfully!');
              response.send({ success: true });
            })
            .catch(() => {
              console.log('Token has not been updated, error');
              response
                .status(400)
                .send(
                  'Token has not been found, probably password already resetted.'
                );
            });
        }
      })

      .catch((err) => {
        console.error('Error finding token, already has been reset!');
        response
          .status(500)
          .send(
            'Error finding token, maybe password has been already resetted?'
          );
      });
  };
