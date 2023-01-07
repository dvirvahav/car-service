import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LandingPage: FC = () => {
  return (
    <div className='container mt-5'>
      <h1 className='text-center text-primary mb-5'>
        Welcome to Our Car Service
      </h1>

      <div className='row'>
        <div className='col-md-6 mb-5'>
          <h3 className='text-primary mb-4'>Why Choose Us</h3>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
        </div>
        <div className='col-md-6 mb-5'>
          <h3 className='text-primary mb-4'>Our Services</h3>
          <ul className='list-group'>
            <li className='list-group-item'>Oil Changes</li>
            <li className='list-group-item'>Tire Rotations</li>
            <li className='list-group-item'>Brake Repairs</li>
            <li className='list-group-item'>Engine Tune-Ups</li>
            <li className='list-group-item'>Preventive Maintenance</li>
          </ul>
        </div>
      </div>

      <div className='text-center mt-5'>
        <button className='btn btn-primary'>Book an Appointment</button>
      </div>
    </div>
  );
};
