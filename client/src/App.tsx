import React, { FC, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Contact } from './pages/contact/contact';
import { Forgot } from './pages/forgot/forgot';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Error } from './pages/error/error';
import { NOTFOUND } from 'dns';
export const App: FC = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Fragment>
    </Router>
  );
};
