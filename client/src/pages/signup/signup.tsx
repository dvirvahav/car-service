import Axios from 'axios';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import PasswordValidator from 'password-validator';
import { FC, useReducer, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import ReCAPTCHA from 'react-google-recaptcha';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { initialState, reducer } from './signup.logic';

export const Signup: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [successfulSignUp, setSuccessfulSignUp] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  var schema = new PasswordValidator();
  const popupRef = useRef<PopupActions>(null);
  const navigate: NavigateFunction = useNavigate();
  const reRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    //check demands
    event.preventDefault();
    console.log(state);
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
      .validate(state.password, { details: true });
    popupRef.current?.open();
    if (Array.isArray(passwordValidator)) {
      setErrors(passwordValidator.map((error) => error.message).slice());
      if (
        passwordValidator.length === 0 &&
        state.password === state.verifyPassword
      ) {
        console.log('Sending signup details!');
        Axios.post('/api/signup', {
          mail: state.mail,
          firstName: state.firstName,
          lastName: state.lastName,
          password: md5(state.password),
          reCaptcha: reRef.current?.getValue(),
        })
          .then((response) => {
            console.log('Successfully sign up!');
            setSuccessfulSignUp(true);

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
        <div className='p-3 my-5 h-custom loading-medium '>
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
                  value={state.firstName}
                  onChange={(event) => {
                    dispatch({
                      type: 'setFirstName',
                      firstName: event.target.value,
                    });
                  }}
                />
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Last Name'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  value={state.lastName}
                  onChange={(event) => {
                    dispatch({
                      type: 'setLastName',
                      lastName: event.target.value,
                    });
                  }}
                />
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size='lg'
                  value={state.mail}
                  onChange={(event) => {
                    dispatch({
                      type: 'setMail',
                      mail: event.target.value,
                    });
                  }}
                />
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size='lg'
                  value={state.password}
                  onChange={(event) => {
                    dispatch({
                      type: 'setPassword',
                      password: event.target.value,
                    });
                  }}
                />
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  label='Confirm'
                  id='formControlLg'
                  type='password'
                  size='lg'
                  value={state.verifyPassword}
                  onChange={(event) => {
                    dispatch({
                      type: 'setVerifyPassword',
                      verifyPassword: event.target.value,
                    });
                  }}
                />
                <ReCAPTCHA
                  sitekey='6LcyZ88jAAAAAMagI7wuLMOETPElR95wqDnWJifW'
                  ref={reRef}
                />{' '}
                <br />
                <MDBBtn
                  className='btn btn-primary btn-lg btn-block'
                  type='submit'>
                  Submit Form
                </MDBBtn>
                <Popup ref={popupRef} modal>
                  <div className='alert popup text-center'>
                    {successfulSignUp ? (
                      <div role='alert'>
                        Your account has been successfully created! <br />
                        Details has been sent to your mail.
                        <br /> <br />
                        <a href='/' className='btn btn-primary'>
                          Login
                        </a>
                      </div>
                    ) : state.password !== state.verifyPassword ? (
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
