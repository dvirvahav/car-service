import { Knex } from 'knex';
import { generateToken } from '../util/generateToken';
import { Request, Response } from 'express';
import { Axios } from 'axios';
import { sendPasswordResetEmail } from '../email/nodeMailer';

export const resetPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const email: string = request.body.mail;
    const token = generateToken();

    db('users').where({ email }).update({ resetToken: token });
    sendPasswordResetEmail(email, token);
  };

export const setNewPasswordController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const { token } = request.params;
    const { password } = request.body;

    db('users')
      .where({ resetToken: token })
      .first()
      .then((user) => {
        if (!user) {
          response.status(400).send({ error: 'Token not found' });
        }

        db('users')
          .where({ resetToken: token })
          .update({ password, resetToken: null });
      })
      .then(() => response.send({ success: true }))
      .catch((err) => {
        console.error(err);
        response.status(500).send({ error: 'Error finding user' });
      });
  };
