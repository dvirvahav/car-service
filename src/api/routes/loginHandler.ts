import Axios from 'axios';
import { Response, Request } from 'express';

export const loginHandler = (request: Request, responseToClient: Response) => {
  const {
    mail,
    password,
    reCaptcha,
  }: { mail: string; password: string; reCaptcha: string } = request.body;
  console.log(reCaptcha);
  // Send a request to the Google reCAPTCHA server to verify the response
  Axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SERVER_KEY}&response=${reCaptcha}`,
    {
      secret: process.env.REACT_APP_SERVER_KEY,
      reCaptcha,
    }
  )
    .then((responseFromGoogle): void => {
      // Check the response from the server
      if (responseFromGoogle.data.success) {
        // The reCAPTCHA was successful

        responseToClient.send({ success: true });
        console.log('success');
      } else {
        // The reCAPTCHA was unsuccessful
        responseToClient.send({ success: false });
        console.log('error');
      }
    })
    .catch((error) => {
      console.log(error);
      responseToClient.send({ success: false });
    });
};
