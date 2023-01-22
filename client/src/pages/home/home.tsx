import md5 from 'md5';
import React, { useRef, useState } from 'react';
import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import { createApiClient } from '../../api/api';
import DataGridDemo from '../../components/home/tables';
import './home.css';
const api = createApiClient();
export const Home: FC = () => {
  const [info, setInfo] = useState('');
  const [workerMail, setWorkerMail] = useState('');
  const [carId, setCarId] = useState('');
  const nav = useNavigate();
  const popupRef = useRef<PopupActions>(null);

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
      .then(() => window.location.reload());
  };

  return (
    <body>
      <header
        style={{ backgroundColor: '#3b71ca' }}
        className='navbar navbar-dark sticky-top  flex-md-nowrap  shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='/'>
          Car Service
        </a>
        <i aria-hidden='true'></i>
        <button
          style={{ backgroundColor: '#3b71ca', color: 'white', border: 'none' }}
          className='fa fa-sign-out'
          type='submit'
          onClick={() => {
            localStorage.removeItem('rememberMe');
            nav('/');
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
            <button type='submit'>Insert!</button>
          </form>
        </div>
      </Popup>

      <div className='container-fluid'>
        <div className='row'>
          <nav
            id='sidebarMenu'
            className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'></nav>

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className='chartjs-size-monitor'>
              <div className='chartjs-size-monitor-expand'>
                <div className=''></div>
              </div>
              <div className='chartjs-size-monitor-shrink'>
                <div className=''></div>
              </div>
            </div>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'></div>
            <h2>Car service</h2>
            <br /> <DataGridDemo />
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
          </main>
        </div>
      </div>
      <script
        src='/docs/5.0/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM'
        crossOrigin='anonymous'></script>
      <script
        src='https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js'
        integrity='sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE'
        crossOrigin='anonymous'></script>
      <script
        src='https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js'
        integrity='sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha'
        crossOrigin='anonymous'></script>
      <script src='dashboard.js'></script>
    </body>
  );
};
