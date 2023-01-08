import { app } from '../../../server';
import { loginController } from '../controllers/login.controller';
import { signupController } from '../controllers/signup.controller';
import { db } from '../db/database';

app.post('/api/login', loginController);
app.post('/api/signup', signupController(db));
