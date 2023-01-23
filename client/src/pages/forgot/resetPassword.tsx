import md5 from 'md5';
import Axios from 'axios';
import { FC, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import PasswordValidator from 'password-validator';
import Swal from 'sweetalert2';

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const token = location.pathname.split('/').pop();

  const [newPassword, setNewPassword] = useState<string>('');
  var schema = new PasswordValidator();

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

    if (Array.isArray(passwordValidator)) {
      setErrors(passwordValidator.map((error) => error.message).slice());
      if (passwordValidator.length === 0)
        Axios.post(`/api/resetPassword/${token}`, {
          password: md5(newPassword),
        })
          .then(() => {
            Swal.fire({
              title: 'Success',
              text: 'Your password has been resetted successfully,,redirect to login.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate('/');
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: errors.toString(),
              icon: 'error',
              confirmButtonText: 'OK',
            });
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
