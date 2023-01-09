import Axios from 'axios';
import { FC, useState } from 'react';

export const ResetPasswordPage: FC = () => {
  const token = new URLSearchParams(window.location.search).get('token');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = () => {
    Axios.post(`/api/resetPassword/${token}`, {
      password: newPassword,
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert('Password reset successfully!');
      }
    });
  };

  return (
    <div>
      <section className='vh-100'>
        <div className='container py-5 h-100'>
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
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
