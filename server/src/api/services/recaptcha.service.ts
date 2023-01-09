import Axios from 'axios';

export const reCaptchaService = (reCaptcha: string) => {
  Axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SERVER_KEY}&response=${reCaptcha}`,
    {
      secret: process.env.REACT_APP_SERVER_KEY,
      reCaptcha,
    }
  )
    .then((responseFromGoogle) => {
      // Check the response from the server
      if (responseFromGoogle.data.success) responseFromGoogle.data.success;
    })
    .catch((error) => {
      return error;
    });
  return 'Axios error';
};
