import Axios from 'axios';

export const reCaptchaService = (reCaptcha: string): boolean => {
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
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return false;
};
