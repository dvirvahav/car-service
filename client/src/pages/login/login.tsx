import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { FC } from 'react';
import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
export const Login: FC = () => {
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
          <MDBInput
            wrapperClass='mb-4'
            label='Email address'
            id='formControlLg'
            type='email'
            size='lg'
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='formControlLg'
            type='password'
            size='lg'
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

          <MDBBtn className='mb-4 w-100' size='lg'>
            Sign in
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
