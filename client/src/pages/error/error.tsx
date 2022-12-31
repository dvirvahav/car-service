import { FC } from 'react';

export const Error: FC = () => {
  return (
    <div className='d-flex align-items-center justify-content-center '>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>404</h1>
        <p className='fs-2'>
          {' '}
          <span className='text-primary'>Opps!</span> Page not found.
        </p>
        <p className='lead'>The page you’re looking for doesn’t exist.</p>
        <a href='/home' className='btn btn-primary'>
          Go Home
        </a>
      </div>
    </div>
  );
};
