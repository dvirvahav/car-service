import { Response, Request } from 'express';
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { db } from './src/api/db/database';
import { loginHandler } from './src/api/routes/loginHandler';

db.raw('SELECT NOW()')
  .then((result) => console.log(`Connection successful: ${result.rows[0].now}`))
  .catch((error) => console.error(`Error connecting to database: ${error}`));
const port = process.env.PORT || 3001;

const app = Express();
app.use(bodyParser.json());
app.use(cors());

app.post(`/api/login`, loginHandler);
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Add your routes here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
