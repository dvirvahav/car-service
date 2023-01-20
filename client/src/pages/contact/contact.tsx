import { FC } from 'react';
import './contact';
export const Contact: FC = () => {
  return (
    <div className='container mt-5'>
      <div className='bg-light p-5'>
        <img
          src='https://i.ibb.co/YN483kn/logo.png'
          alt='CarService logo'
          className='img-fluid big-logo'
        />
      </div>
      <div className='row mt-5'>
        <div className='col-md-3'>
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
        <div className='col-md-3'>
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
        <div className='col-md-3'>
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
        <div className='col-md-3'>
          <img
            src='https://i.ibb.co/GFQqDJF/strong-brand.png'
            alt='Strong Brand'
            className='img-fluid small-image'
          />
          <h3>Strong Brand</h3>
          <p>
            CarServiece is a well-known and reliable brand that has maintained
            its quality for many years.
          </p>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-md-8'>
          <h1>About Us</h1>
          <p>
            CarServiece is a company specializing in the repair of all types of
            vehicles, including luxury vehicles. Our team is made up of people
            who have gone through internships in authorized garages of various
            companies, so with us you can find an effective, fast, and fair
            solution for any vehicle!
          </p>
          <p>
            At CarServiece, the customer is our top priority. That's why we
            offer 24/7 customer service, a six-month warranty on repairs, and a
            replacement vehicle when needed.
          </p>
        </div>
        <div className='col-md-4'>
          <img
            src='https://i.ibb.co/CwGM4dP/car.png'
            alt='A car being repaired at CarService'
            className='img-fluid big-logo'
          />
        </div>
      </div>
      <h2>Meet the Team</h2>
      <div className='row mt-5'>
        <div className='col-md-6 float-left'>
          <h3>Dvir Vahav, CEO</h3>
          <img
            src='https://i.ibb.co/zn9qnpw/Dvir.jpg'
            alt='Dvir Vahav'
            className='img-fluid small-image'
          />
          <p>
            Dvir is a father of three and lives in Kiryat Atta. He has a
            supportive wife and their number one role is ensuring the customer
            always comes first.
          </p>
        </div>
        <div className='col-md-6 float-right'>
          <h3>Hani Eival, CFO</h3>
          <img
            src='https://i.ibb.co/Cb1yjLJ/Hani.jpg'
            alt='Hani Eival'
            className='img-fluid small-image'
          />
          <p>
            Hani has two cute dogs and lives in Kiryat Atta. Her favorite
            sentence is "Stingy pays more."
          </p>
        </div>
      </div>
    </div>
  );
};
