import { MDBInput } from 'mdb-react-ui-kit';
import { FC } from 'react';

export const Forgot: FC = () => {
  return (
    <div>
      <section className='vh-100'>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=826&t=st=1672346638~exp=1672347238~hmac=70a525498367b9aed1faec52eb709f24a258f2e022cce68648bbb4af3c111ae9'
                className='img-fluid'
                alt='Sample '
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <form>
                <h1 className='display-4  start-50  position-relative translate-middle'>
                  Forgot your password?
                </h1>
                <hr className='hr' />

                <div className='form-outline mb-4'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email address'
                    id='formControlLg'
                    type='email'
                    size='lg'
                  />
                </div>

                <div className='text-center text-lg-start mt-4 pt-2 '>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg btn-block'>
                    Reset Password
                  </button>
                  <p
                    className='small fw-bold mt-2 pt-1 mb-0'
                    style={{ verticalAlign: 'middle' }}>
                    Already have an account?{' '}
                    <a href='#!' className='link-danger'>
                      Sign in
                    </a>
                  </p>
                  <p
                    className='small fw-bold mt-2 pt-1 mb-0'
                    style={{ verticalAlign: 'middle' }}>
                    Don't have an account?{' '}
                    <a href='#!' className='link-danger'>
                      Sign up
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
