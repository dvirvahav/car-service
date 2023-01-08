import Axios from 'axios';

export const reCaptchaService = (reCaptcha: string): string => {
  Axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SERVER_KEY}&response=${reCaptcha}`,
    {
      secret: process.env.REACT_APP_SERVER_KEY,
      reCaptcha,
    }
  )
    .then((responseFromGoogle) => {
      // Check the response from the server
      if (responseFromGoogle.data.success)
        // The reCAPTCHA was successful
        return 'success';
      // The reCAPTCHA was unsuccessful
      return '';
    })
    .catch((error) => {
      return error;
    });
  return 'Axios error';
};
