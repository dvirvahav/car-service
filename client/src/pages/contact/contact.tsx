import { FC, useReducer } from 'react';
import './contact.css';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { contactReducer, initialStateContact } from './contact.logic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createApiClient } from '../../api/api';
const api = createApiClient();

export const Contact: FC = () => {
  const [state, dispatch] = useReducer(contactReducer, initialStateContact);
  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    api
      .contactUs(state.mail, state.firstName, state.lastName, state.comment)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Thanks for your comment :)',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong sending your mail, try again later ',
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
      <div className='row loading-medium '>
        <div className='col-md-12 text-center logo'>
          <img src='https://i.ibb.co/YN483kn/logo.png' alt='Logo' />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3 shadow-like3 loading-slow '>
          <img
            src='https://i.ibb.co/9ZPs3ZL/fast.png'
            alt='Fast'
            className='img-fluid small-image'
          />
          <h3>Fast</h3>
          <p>
            We broke the speed record in vehicle repair in the indices published
            by the state inspector of car fixing places.
          </p>
        </div>
        <div className='col-md-3 shadow-like1 loading-slow '>
          <img
            src='https://i.ibb.co/RgJ2jKD/POP.jpg'
            alt='People of people'
            className='img-fluid small-image'
          />
          <h3>People of people</h3>
          <p>
            Our company takes care of the customer's well-being first and brings
            back a customer service team that works around the clock.
          </p>
        </div>
        <div className='col-md-3 shadow-like3 loading-slow'>
          <img
            src='https://i.ibb.co/ZXMK7pV/certified.png'
            alt='Certified'
            className='img-fluid small-image'
          />
          <h3>Certified</h3>
          <p>
            Our team of technicians consists of people who have undergone
            training courses in authorized garages of all car companies and we
            provide a professional response to all types of your vehicle.
          </p>
        </div>
        <div className='col-md-3 shadow-like1 loading-slow'>
          <img
            src='https://i.ibb.co/GFQqDJF/strong-brand.png'
            alt='Strong Brand'
            className='img-fluid small-image'
          />
          <h3>Strong Brand</h3>
          <p>
            Car Service is a well-known and reliable brand that has maintained
            its quality for many years.
          </p>
        </div>
      </div>
      <div
        className='row mt-5 shadow-like2'
        style={{
          marginBottom: '100px',

          padding: '80px',
        }}>
        <div className='col-md-8'>
          <h1>About Us</h1>
          <p>
            Car Service is a company specializing in the repair of all types of
            vehicles, including luxury vehicles. Our team is made up of people
            who have gone through internships in authorized garages of various
            companies, so with us you can find an effective, fast, and fair
            solution for any vehicle!
          </p>
          <p>
            At Car Service, the customer is our top priority. That's why we
            offer 24/7 customer service, a six-month warranty on repairs, and a
            replacement vehicle when needed.
          </p>
        </div>
        <div className='col-md-4 '>
          <img
            src='https://i.ibb.co/CwGM4dP/car.png'
            alt='A car being repaired at CarService'
            className='img-fluid big-logo'
          />
        </div>
      </div>

      <div
        className='row mt-5 shadow-like2 '
        style={{ marginBottom: '100px', padding: '80px' }}>
        <h2>Meet the Team</h2>
        <br />
        <br /> <br />
        <div className='col-md-6 float-left  '>
          <h3>Dvir Vahav, CEO</h3>
          <img
            src='https://i.ibb.co/zn9qnpw/Dvir.jpg'
            alt='Dvir Vahav'
            className='img-fluid '
          />
          <br />
          <br />
          <p>
            Meet Dvir, a dedicated father of three and a resident of Kiryat
            Atta. He is blessed with a supportive wife and together they strive
            to put the customer's needs first in all their endeavors. At the
            heart of Dvir's business philosophy is a commitment to providing
            exceptional customer service.
          </p>
        </div>
        <div className='col-md-6 float-right '>
          <h3>Hani Eival, CFO</h3>
          <img
            height='200
            '
            width='220'
            src='https://i.ibb.co/Cb1yjLJ/Hani.jpg'
            alt='Hani Eival'
            className='img-fluid '
          />
          <br />
          <br />
          <p>
            Get to know Hani, a Kiryat Ata resident and a pet-lover. She is the
            proud owner of two adorable dogs. As a business-minded individual,
            Hani believes that "Stingy pays more" and she applies this principle
            to her professional and personal life.
          </p>
        </div>
      </div>
      <div>
        <form className='needs-validation' onSubmit={handleSubmit}>
          <br />
          <h1
            className='display-1   '
            style={{ marginTop: '40px', textAlign: 'center' }}>
            Contact Us!
          </h1>
          <hr className='hr' />
          <MDBInput
            required
            wrapperClass='mb-4'
            label='First Name'
            id='formControlLg'
            type='text'
            size='lg'
            value={state.firstName}
            onChange={(event) => {
              dispatch({
                type: 'setFirstName',
                firstName: event.target.value,
              });
            }}
          />
          <MDBInput
            required
            wrapperClass='mb-4'
            label='Last Name'
            id='formControlLg'
            type='text'
            size='lg'
            value={state.lastName}
            onChange={(event) => {
              dispatch({
                type: 'setLastName',
                lastName: event.target.value,
              });
            }}
          />
          <MDBInput
            required
            wrapperClass='mb-4'
            label='Email address'
            id='formControlLg'
            type='email'
            size='lg'
            value={state.mail}
            onChange={(event) => {
              dispatch({
                type: 'setMail',
                mail: event.target.value,
              });
            }}
          />

          <label htmlFor='comment'>Comment:</label>
          <textarea
            value={state.comment}
            onChange={(event) => {
              dispatch({
                type: 'setComment',
                comment: event.target.value,
              });
            }}
            className='form-control'
            rows={5}
            id='comment'></textarea>

          <br />
          <MDBBtn className='btn btn-primary btn-lg btn-block' type='submit'>
            Submit Form
          </MDBBtn>
          <p
            className='small fw-bold mt-2 pt-1 mb-0'
            style={{ verticalAlign: 'middle' }}>
            Return To Home Page?{' '}
            <a href='/' className='link-danger'>
              Click Here!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
