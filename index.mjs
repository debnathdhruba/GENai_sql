import express from 'express';
import { dbConnection } from './dbConnection/dbConnection.mjs';
import queryInfarense from './controller/llmServiceController.mjs';
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api' ,queryInfarense)


app.listen(port, async(req,res) => {
 const conn = await dbConnection();
 if(conn){
    console.log('Connection has been established successfully.');
 }
  // res.send('Server is running on port 3000');
  console.log(`Server is running on port ${port}`);
});

