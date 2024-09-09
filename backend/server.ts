import express from 'express';
import dotenv from 'dotenv';
import router from 'router';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});