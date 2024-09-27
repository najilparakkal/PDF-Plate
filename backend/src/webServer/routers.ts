import express from "express";
import controller from "../adaptors/controller";
import { middleware } from "./middleware";
const routers = express.Router();

 
routers.post('/signup',controller.signup)
routers.post('/signin',controller.signin)
routers.post('/upload',middleware,controller.upload)
routers.get("/histroy/:email",controller.histroy)

export default routers      