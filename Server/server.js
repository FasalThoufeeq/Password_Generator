import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import bodyParser from 'body-parser'
import morgan from 'morgan'
import userRoutes from "./Routes/UsersRoutes.js";
import connectDB from '../Server/Config/db.js'

const app = express();
connectDB()

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors());

app.use("/api", userRoutes());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
