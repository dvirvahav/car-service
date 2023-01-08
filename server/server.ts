import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import path from 'path';
import { db } from './src/api/db/database';
export const app = Express();

const port = process.env.PORT || 3001;
app.use(Express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

db.raw('SELECT NOW()')
  .then((result) => console.log(`Connection successful: ${result.rows[0].now}`))
  .catch((error) => console.error(`Error connecting to database: ${error}`));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
