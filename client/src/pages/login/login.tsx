import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { FC, useRef, useState } from 'react';
import React from 'react';
import Axios from 'axios';
import { MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTreatmentsContext } from '../../context/treatments';
import { useUserContext } from '../../context/user';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

export const Login: FC = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useUserContext();
  const { setTreatments } = useTreatmentsContext();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const reRef = useRef<ReCAPTCHA>(null);

  window.addEventListener('load', function () {
    if (
      localStorage.getItem('email') &&
      localStorage.getItem('password') &&
      localStorage.getItem('rememberMe')
    ) {
      nav('/home');
    }
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/api/login', {
      email: email,
      password: md5(password),
      reCaptcha: reRef.current?.getValue(),
    })
      .then((response) => {
        setUser({
          password: md5(password),
          mail: email,
          lastName: 'Check',
          firstName: 'Check2',
        });
        setTreatments(response.data);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        rememberMe
          ? localStorage.setItem('rememberMe', 'f')
          : localStorage.removeItem('rememberMe');

        nav('/home');
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <section className='vh-100'>
        <div className='p-3 my-5 h-custom loading-medium '>
          <div className='row d-flex justify-content-center align-items-center '>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                className='img-fluid'
                alt='Phone'
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <h1 className='display-1   '>Login to your account</h1>
              <hr className='hr' />
              <form onSubmit={handleSubmit}>
                <MDBInput
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  wrapperClass='mb-4'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size='lg'
                  autoComplete='on'
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
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <a href='/forgot'>Forgot password?</a>
                </div>

                <MDBBtn type='submit' className='mb-4 w-100' size='lg'>
                  Sign In
                </MDBBtn>
              </form>
              <p
                className='small fw-bold mt-2 pt-1 mb-0'
                style={{ verticalAlign: 'middle' }}>
                Don't have an account ?{' '}
                <a href='/signup' className='link-danger'>
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
