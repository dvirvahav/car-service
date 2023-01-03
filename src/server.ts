import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './api/db/database';
import path from 'path';

db.raw('SELECT NOW()')
  .then((result) => console.log(`Connection successful: ${result.rows[0].now}`))
  .catch((error) => console.error(`Error connecting to database: ${error}`));

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Add your routes here

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
