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
    if (!(localStorage.getItem('email') && localStorage.getItem('password'))) {
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
          text: 'Database updated!',
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
    <div className='container logo '>
      <nav
        style={{ backgroundColor: '#3b71ca' }}
        className='navbar navbar-dark sticky-top  flex-md-nowrap  shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='/home'>
          Dashboard
        </a>

        <a
          className='navbar-brand '
          style={{ listStyle: 'false' }}
          href='/contact'>
          Contact Us
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
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            navigate('/');
          }}>
          Log Out
        </button>
      </nav>

      <Popup ref={popupRef} modal>
        <div className='alert popup text-center loading-medium '>
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
                type='email'
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
      <br />
      <h1>Car service</h1>
      <div
        className='container-fluid'
        style={{
          marginTop: '100px',
          padding: '0',
          height: '400px',
        }}>
        <br />
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
    </div>
  );
};
