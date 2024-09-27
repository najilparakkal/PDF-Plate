import express, { Application } from 'express';
import { configureExpress } from './config/express';
import morgan from "morgan";
import routers from './webServer/routers';


const app: Application = express();

const PORT = process.env.PORT ;



app.use(express.json());
configureExpress(app)
app.use(morgan("dev"));
app.use('/api', routers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
         