import { Response, Request } from 'express';
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { db } from './src/api/db/database';

db.raw('SELECT NOW()')
  .then((result) => console.log(`Connection successful: ${result.rows[0].now}`))
  .catch((error) => console.error(`Error connecting to database: ${error}`));

const app = Express();
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Add your routes here

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
