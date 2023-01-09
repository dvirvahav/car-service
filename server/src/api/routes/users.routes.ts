import { app } from '../../../server';
import { loginController } from '../controllers/login.controller';
import {
  resetPasswordController,
  setNewPasswordController,
} from '../controllers/resetPassword.controller';
import { signupController } from '../controllers/signup.controller';
import { db } from '../db/database';

app.post('/api/login', loginController);
app.post('/api/signup', signupController(db));

app.get('/api/reset-password/:token', setNewPasswordController(db));

app.get('/reset-password/:token', (request, response) => {
  // Send the resetPassword.html file as the response
  response.sendFile(__dirname + '/public/resetPassword.html');
});
