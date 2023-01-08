import Axios from 'axios';
import { Response, Request } from 'express';
import { reCaptchaService } from '../services/recaptcha.service';

export const loginController = (
  request: Request,
  responseToClient: Response
) => {
  const {
    mail,
    password,
    reCaptcha,
  }: { mail: string; password: string; reCaptcha: string } = request.body;

  // Send a request to the Google reCAPTCHA server to verify the response
  reCaptchaService(reCaptcha) === 'success' ? 'D' : 'E';
};
