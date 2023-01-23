import md5 from 'md5';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import { createApiClient } from '../../api/api';
import DataGridDemo from '../../components/home/tables';
import './home.css';
import Swal from 'sweetalert2';

const api = createApiClient();
export const Home: FC = () => {
  const [info, setInfo] = useState('');
  const [workerMail, setWorkerMail] = useState('');
  const [carId, setCarId] = useState('');
  const popupRef = useRef<PopupActions>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem('rememberMe') ||
      (localStorage.getItem('username') && localStorage.getItem('password'))
    ) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    api
      .updateTreatment(
        '',
        String(localStorage.getItem('email')),
        md5(String(localStorage.getItem('password'))),
        String(info),
        String(workerMail),
        String(carId)
      )
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'You will be transferred to Home page.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        window.location.reload();
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wring sending your mail, try again later ',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div>
      <header
        style={{ backgroundColor: '#3b71ca' }}
        className='navbar navbar-dark sticky-top  flex-md-nowrap  shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='/'>
          Car Service
        </a>
        <i aria-hidden='true'></i>
        <button
          style={{
            backgroundColor: '#3b71ca',
            color: 'white',
            border: 'none',
          }}
          className='fa fa-sign-out'
          type='submit'
          onClick={() => {
            localStorage.removeItem('rememberMe');

            navigate('/');
          }}></button>
      </header>

      <Popup ref={popupRef} modal>
        <div className='alert popup text-center'>
          {' '}
          <form onSubmit={handleSubmit} className='form-group'>
            <label>
              car ID:
              <input
                className='form-control'
                type='text'
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Info:
              <input
                className='form-control'
                type='text'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </label>

            <br />
            <label>
              Worker Email:
              <input
                className='form-control'
                type='text'
                value={workerMail}
                onChange={(e) => setWorkerMail(e.target.value)}
              />
            </label>
            <br />
            <button type='submit' className='btn'>
              Insert!
            </button>
          </form>
        </div>
      </Popup>

      <div className='container-fluid'>
        <main className=' px-md-4'>
          <h2>Car service</h2>

          <div className='table-responsive dataTable'>
            <DataGridDemo />
            <button
              style={{
                backgroundColor: '#3b71ca',
                color: 'white',
                border: 'none',
              }}
              type='submit'
              onClick={() => {
                popupRef.current?.open();
              }}>
              +
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
