import Axios from 'axios';
import { Request, Response } from 'express';
import { Knex } from 'knex';
import { mailService, welcomeMail } from '../email/nodeMailer';
import { reCaptchaService } from '../services/recaptcha.service';

export const contactController =
  (db: Knex<any, unknown[]>) => (request: Request, response: Response) => {
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const comment: string = request.body.comment;
  };
