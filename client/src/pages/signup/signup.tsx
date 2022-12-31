import { MDBInput } from 'mdb-react-ui-kit';
import { FC } from 'react';

export const Signup: FC = () => {
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
              <form>
                <h1 className='display-1  start-50  position-relative translate-middle'>
                  Sign up
                </h1>
                <hr className='hr' />
                <div
                  className='form-outline mb-4
                '>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='First Name'
                    id='formControlLg'
                    type='text'
                    size='lg'
                  />
                </div>
                <div
                  className='form-outline mb-4
                '>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Last Name'
                    id='formControlLg'
                    type='text'
                    size='lg'
                  />
                </div>
                <div className='form-outline mb-4'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email address'
                    id='formControlLg'
                    type='email'
                    size='lg'
                  />
                </div>

                <div className='form-outline mb-3'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='formControlLg'
                    type='password'
                    size='lg'
                  />
                </div>
                <div className='form-outline mb-2'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Confirm'
                    id='formControlLg'
                    type='password'
                    size='lg'
                  />
                </div>

                <div className='text-center text-lg-start mt-4 pt-2 '>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg btn-block'>
                    Sign up
                  </button>
                  <p
                    className='small fw-bold mt-2 pt-1 mb-0'
                    style={{ verticalAlign: 'middle' }}>
                    Already have an account?{' '}
                    <a href='#!' className='link-danger'>
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
