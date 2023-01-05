import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { FC, useRef, useState } from 'react';
import React from 'react';
import Axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import ReCAPTCHA from 'react-google-recaptcha';

export const Login: FC = () => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const reRef = useRef<ReCAPTCHA>(null);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    Axios.post('/api/login', {
      method: 'POST',
      data: {
        mail: mail,
        password: password,
        reCaptcha: reRef.current?.getValue(),
      },
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <MDBContainer fluid className='p-3 my-5'>
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img
            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
            className='img-fluid'
            alt='Phone'
          />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <h1 className='display-1   '>Login to your account</h1>
          <hr className='hr' />
          <form onSubmit={handleSubmit}>
            <MDBInput
              value={mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              wrapperClass='mb-4'
              label='Email address'
              id='formControlLg'
              type='email'
              size='lg'
            />
            <MDBInput
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              wrapperClass='mb-4'
              label='Password'
              id='formControlLg'
              type='password'
              size='lg'
            />
            <ReCAPTCHA
              sitekey='6LcyZ88jAAAAAMagI7wuLMOETPElR95wqDnWJifW'
              ref={reRef}
            />
            <div className='d-flex justify-content-between mx-4 mb-4'>
              <MDBCheckbox
                name='flexCheck'
                value=''
                id='flexCheckDefault'
                label='Remember me'
              />
              <a href='/forgot'>Forgot password?</a>
            </div>

            <MDBBtn type='submit' className='mb-4 w-100' size='lg'>
              Sign In
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
