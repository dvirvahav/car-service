import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from '@themesberg/react-bootstrap';

import { FC } from 'react';

export const Home: FC = () => {
  return (
    <>
      <header>
        <nav
          id='sidebarMenu'
          className='collapse d-lg-block sidebar collapse bg-white'>
          <div className='position-sticky'>
            <div className='list-group list-group-flush mx-3 mt-4'>
              <a
                href='#'
                className='list-group-item list-group-item-action py-2 ripple active'
                aria-current='true'>
                <i className='fas fa-tachometer-alt fa-fw me-3'></i>
                <span>Main dashboard</span>
              </a>
              <a
                href='#'
                className='list-group-item list-group-item-action py-2 ripple '>
                <i className='fas fa-chart-area fa-fw me-3'></i>
                <span>Profile</span>
              </a>

              <a
                href='#'
                className='list-group-item list-group-item-action py-2 ripple'>
                <i className='fas fa-chart-line fa-fw me-3'></i>
                <span>Analytics</span>
              </a>
            </div>
          </div>
        </nav>

        <nav
          id='main-navbar'
          className='navbar navbar-expand-lg navbar-light bg-white bg-primary fixed-top '>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-mdb-toggle='collapse'
              data-mdb-target='#sidebarMenu'
              aria-controls='sidebarMenu'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <i className='fas fa-bars'></i>
            </button>

            <a className='navbar-brand' href='/'>
              <i style={{ color: 'white' }} className='fas fa-car'></i>
            </a>

            <ul className='navbar-nav ms-auto d-flex flex-row'>
              <li className='nav-item me-3 me-lg-0'>
                <a
                  className='nav-link'
                  href='https://github.com/dvirvahav/car-service'>
                  <i className='fab fa-github'></i>
                </a>
              </li>
              <li className='nav-item me-3 me-lg-0'>
                <a
                  className='nav-link'
                  href='https://github.com/dvirvahav/car-service'>
                  <i className='fa fa-sign-out'></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main style={{ marginTop: '58px' }}>
        <div className='container pt-4'></div>
      </main>
    </>
  );
};
