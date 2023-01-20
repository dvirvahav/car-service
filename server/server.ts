import cors from 'cors';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { loginController } from './src/api/controllers/login.controller';
import { signupController } from './src/api/controllers/signup.controller';
import {
  resetPasswordController,
  setNewPasswordController,
} from './src/api/controllers/resetPassword.controller';
import { db } from './src/api/db/database';

export const app = Express();
//production
const port = process.env.PORT || 3001;
app.use(Express.static(path.join(__dirname, 'public')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//END production
app.use(bodyParser.json());
app.use(cors());

db.raw('SELECT NOW()')
  .then((result) => console.log(`Connection successful: ${result.rows[0].now}`))
  .catch((error) => console.error(`Error connecting to database: ${error}`));

//production
app.get('/reset-password/', (request, response) => {
  // Send the resetPassword.html file as the response
  response.sendFile(path.join(__dirname + 'api/view/resetPassword.html'));
});
//END production

app.post('/api/resetPassword/:token', setNewPasswordController(db));
app.post('/api/resetPassword', resetPasswordController(db));
app.post('/api/login', loginController(db));
app.post('/api/signup', signupController(db));
app.get('/api/treatment', (req, responseToClient) => {
  const email: string = String(req.query.email);
  const password: string = String(req.query.password);

  console.log(email + '' + password);
  console.log('treatment: ');
  db.select()
    .from('users')
    .where({ email: email, password: password })
    .then((rows) => {
      if (rows.length) {
        db.select()
          .from('treatments')
          .where('user_email', email)
          .then((rows) => {
            console.log('Get treatment: Found user! sending data....');
            responseToClient.send(rows);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('email and password do not exist');
        responseToClient.status(400);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/api/updateTreatment', (req, responseToClient) => {
  const id: number = Number(req.query.id);
  const email: string = String(req.query.email);
  const password: string = String(req.query.password);

  const info: string = String(req.query.info);
  const car_id: string = String(req.query.car_id);
  const worker_email: string = String(req.query.worker_email);
  console.log(info, car_id, worker_email);
  console.log('update treatment');
  db('treatments')
    .where({ id: id })
    .first()
    .then((treatment) => {
      if (treatment) {
        db('treatments')
          .where({ id })
          .update({
            info: info,
            car_id: car_id,
            worker_email: worker_email,
          })
          .then(() => {
            console.log('Updated treatment with ID', id);
            responseToClient
              .status(200)
              .send({ message: 'Treatment Updated successfully' });
          })
          .catch((error) => {
            console.log(error);
            responseToClient
              .status(500)
              .send({ message: 'Error Updating treatment' });
          });
      } else {
        // case its insert
        db('treatments')
          .insert({
            info,
            worker_email,
            car_id,
            user_email: email,
          })
          .then(() => {
            responseToClient
              .status(200)
              .json({ message: 'Treatment inserted successfully' });
          })
          .catch((error) => {
            console.error(error);
            responseToClient
              .status(500)
              .json({ error: 'Error inserting treatment' });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      responseToClient
        .status(500)
        .json({ error: 'Error checking for existing treatment' });
    });
});

app.get('/api/deleteTreatment', (req, responseToClient) => {
  const id: number = Number(req.query.id);
  const email: string = String(req.query.email);
  const password: string = String(req.query.password);

  console.log(email + '' + password);
  console.log('delete treatment: ');
  db.select()
    .from('users')
    .where({ email: email, password: password })
    .then((rows) => {
      if (rows.length) {
        db.delete()
          .from('treatments')
          .where({
            user_email: email,
            id: id,
          })
          .then(() => {
            console.log('Deleted treatment with ID', id);
            db.select()
              .from('treatments')
              .where('user_email', email)
              .then((rows) => {
                console.log('Found treatments for email', email);
                responseToClient.status(200).send(rows);
              })
              .catch((error) => {
                console.log(error);
                responseToClient
                  .status(500)
                  .send({ message: 'Error finding treatments' });
              });
          })
          .catch((error) => {
            console.log(error);
            responseToClient
              .status(500)
              .send({ message: 'Error deleting treatment' });
          });
      } else {
        console.log('email and password do not exist');
        responseToClient.status(400);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
