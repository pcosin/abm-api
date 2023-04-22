import express  from "express";
import { AuthController } from "../controller/AuthController.js";
// body parser
import  bodyParser  from "body-parser";
// middleware to read json in body
let jsonParser = bodyParser.json()
// Router from express
let authRouter = express.Router();

authRouter.route('/login')
    .post(jsonParser, async (req, res) => {
        let {email, password} = req?.body
 
          // Validate required properties
          if (!email || !password) {
            return res.status(400).send({
                message: '[Error user data missing]: no user can be registered'
            });
        }

        
        try {
             // controller instance to excute method 
             const controller = new AuthController()

             let auth = {
                 email,
                 password
             }
             // obtain response 
             const response = await controller.loginUser(auth)
               // send to the cliente the response wich includes the jwt to authorize requests
             return res.status(200).send(response)
        } catch (error) {
             // send to the cliente the response
             return res.status(400).send({
              message: '[Error user data missing]: no user can be registered'
            })
        }
        
        
        // if (email && password) {
        //        // controller instance to excute method 
        //        const controller = new AuthController()

        //        let auth = {
        //            email,
        //            password
        //        }
        //        // obtain response 
        //        const response = await controller.loginUser(auth)
        //          // send to the cliente the response wich includes the jwt to authorize requests
        //        return res.status(200).send(response)
        // }else{
        //       // send to the cliente the response
        //       return res.status(400).send({
        //         message: '[Error user data missing]: no user can be registered'
        //       })
        // }
    })

export default authRouter