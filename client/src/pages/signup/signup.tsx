import Axios from 'axios';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import PasswordValidator from 'password-validator';
import { FC, FormEvent, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import md5 from 'md5';
export const Signup: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successfullSignup, setSucessfullSignup] = useState<boolean>(false);
  var schema = new PasswordValidator();
  const popupRef = useRef<PopupActions>(null);
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    //check demands
    event.preventDefault();
    popupRef.current?.open();
    const passwordValidator = schema
      .is()
      .min(6)
      .is()
      .max(50)
      .is()
      .not()
      .spaces()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .uppercase()
      .has()
      .symbols()
      .validate(password, { details: true });

    if (Array.isArray(passwordValidator)) {
      setErrors(passwordValidator.map((error) => error.message).slice());
      if (passwordValidator.length === 0 && password === verifyPassword) {
        Axios.post('/api/signup', {
          mail: mail,
          firstName: firstName,
          lastName: lastName,
          password: md5(password),
        })
          .then((response) => {
            setSucessfullSignup(true);
            if (response.data !== 'Error') {
              navigate('/login');
            }
          })
          .catch(() => {
            alert("Couldn't get a response from server");
          });
      }
    }
  };

  return (
    <div>
      <section className='vh-100'>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center '>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='img-fluid'
                alt='Sample '
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <form className='needs-validation' onSubmit={handleSubmit}>
                <br />
                <h1 className='display-1   '>Sign up</h1>
                <hr className='hr' />

                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='First Name'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />

                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Last Name'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />

                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size='lg'
                  value={mail}
                  onChange={(event) => {
                    setMail(event.target.value);
                  }}
                />

                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size='lg'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />

                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Confirm'
                  id='formControlLg'
                  type='password'
                  size='lg'
                  value={verifyPassword}
                  onChange={(event) => {
                    setVerifyPassword(event.target.value);
                  }}
                />
                <MDBBtn
                  className='btn btn-primary btn-lg btn-block'
                  type='submit'>
                  Submit Form
                </MDBBtn>

                <Popup ref={popupRef} modal>
                  <div className='alert popup text-center'>
                    {successfullSignup ? (
                      <div role='alert'>
                        Your account has been successfully created! <br />
                        Details has been sent to your mail.
                        <br /> <br />
                        <a href='/' className='btn btn-primary'>
                          Login
                        </a>
                      </div>
                    ) : password !== verifyPassword ? (
                      <div>Passwords do not match</div>
                    ) : (
                      errors.map((error) => <p key={error}>{error}</p>)
                    )}
                  </div>
                </Popup>

                <p
                  className='small fw-bold mt-2 pt-1 mb-0'
                  style={{ verticalAlign: 'middle' }}>
                  Already have an account?{' '}
                  <a href='/' className='link-danger'>
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
