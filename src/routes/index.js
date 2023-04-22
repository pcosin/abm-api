/**
 * root router
 * redirections to routers
 */
import express from "express";
import { logInfo } from '../utils/logger.js'
import authRouter from "./AuthRouter.js";
import posRouter from "./posRouter.js";
import usersRouter from "./UsersRouter.js";
import vehicleRouter from "./VehicleRouter.js";

// Server instance
let server = express()

// Router instance
let rootRouter = express.Router()

// activate for request to http://localhost:8000/api
rootRouter.get('/', (req, res) => {
    
    logInfo(`GET root http://localhost:8000/api`)
    res.send('ABM MONTELECTRO')

})

// TODO config cors
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// redirection to routers y controllers
server.use('/', rootRouter) //  http://localhost:8000/api/
server.use('/users', usersRouter) //  http://localhost:8000/api/users/
server.use('/auth', authRouter ) //  http://localhost:8000/api/auth/
server.use('/pos', posRouter)//  http://localhost:8000/api/pos/
server.use('/vehicles', vehicleRouter)//  http://localhost:8000/api/vehicles/

export default server