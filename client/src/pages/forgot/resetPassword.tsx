import md5 from 'md5';
import Axios from 'axios';
import { FC, useRef, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { PopupActions } from 'reactjs-popup/dist/types';
import PasswordValidator from 'password-validator';
import Popup from 'reactjs-popup';

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const token = location.pathname.split('/').pop();
  const [successfulSignUp, setSuccessfulSignUp] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  var schema = new PasswordValidator();
  const popupRef = useRef<PopupActions>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
      .validate(newPassword, { details: true });
    popupRef.current?.open();
    if (Array.isArray(passwordValidator)) {
      setErrors(passwordValidator.map((error) => error.message).slice());
      if (passwordValidator.length === 0)
        Axios.post(`/api/resetPassword/${token}`, {
          password: md5(newPassword),
        })
          .then((response) => {
            console.log(response);
            setSuccessfulSignUp(true);
            navigate('/');
          })
          .catch(() => {
            setSuccessfulSignUp(false);
            setErrors(['Something went wrong..']);
          });
    }
  };

  return (
    <div>
      <section className='vh-100'>
        <div className='p-3 my-5 h-custom loading-medium'>
          <div className='row d-flex align-items-center justify-content-center h-100'>
            <div className='col-md-8 col-lg-7 col-xl-6'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                className='img-fluid'
                alt='sd'
              />
            </div>
            <div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
              <form onSubmit={handleSubmit} id='reset-password-form'>
                <h1>Enter new Password</h1>
                <br />
                <br />
                <br />

                <div className='form-outline mb-4'>
                  <input
                    type='password'
                    id='form1Example23'
                    value={newPassword}
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                    className='form-control form-control-lg'
                  />
                  <label className='form-label' htmlFor='form1Example23'>
                    New Password
                  </label>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-lg btn-block'>
                  Reset Password
                </button>
              </form>
              <Popup ref={popupRef} modal>
                <div className='alert popup text-center'>
                  {successfulSignUp ? (
                    <div role='alert'>
                      <br />
                      Password successfully resetted, redirect to login...
                      <br /> <br />
                      <a href='/' className='btn btn-primary'>
                        Login
                      </a>
                    </div>
                  ) : (
                    errors.map((error) => <p key={error}>{error}</p>)
                  )}
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
