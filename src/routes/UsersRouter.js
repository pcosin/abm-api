import express from 'express'
import { UserController } from '../controller/UserController.js'
import { logInfo, logError } from '../utils/logger.js'
import bodyParser from 'body-parser'
import verifyToken from '../middlewares/verifyToken.middleware.js'
// import { generatedCodeB } from '../utils/generatedCodeB.js'
import { upload } from '../utils/uploadFile.js'


let jsonParser = bodyParser.json()
// Router from express
let usersRouter = express.Router()

usersRouter.route('/:collection')
    // GET => http://localhost:8000/api/users/:collection
    // GET => http://localhost:8000/api/users/:collection/?id=
    .get( verifyToken,async (req, res) => {
         // obtain a query param
        let id = req?.query?.id
        let apellido = req?.query?.apellido
        let collection = req.params.collection
        let dni = req.query?.identificacion

        let response = ''
        try {
            
            if(apellido){
  
                logInfo(`Query param received: ${apellido}`)
                // controller instance to excute method
                const controller = new UserController()
                // obtain response
                response = await controller.findUsersByname(collection,apellido)
            }
            else if(dni){
                logInfo(`Query param received: ${dni}`)
                // controller instance to excute method
                const controller = new UserController()
                // obtain response
                response = await controller.findUserByDni(collection,dni)
            }else{
              logInfo(`Query param received: ${id, apellido}`)
              // controller instance to excute method
              const controller = new UserController()
              // obtain response
              response = await controller.getUsers(collection,id)
            }
            // send to the client response
            return res.send(response)


        } catch (error) {
            logError(`[Error get users]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error get users]: unable to get users'
            });
        }
        
        
    })
    .post( verifyToken, jsonParser, upload.any(), async (req, res) => {
         // obtain parameters of body 
        let user = req?.body
        let collection = req.params.collection
    
         
        // Validate required properties
        if (!user || !user.nombre || !user.identificacion) {
            return res.status(400).send({
                message: '[Error user data missing]: no user can be registered'
            });
        }

        
        user.estado = 'egreso'

        // controller instance to executed method
        const controller =  new UserController()

      
        try {

            await controller.saveFiles(user, req.files)
            // obtain response
            const response  = await controller.createUser(collection,user)
            logInfo(`[User acepted]: ${user.nombre} ${user.identificacion}`)
            // send to the client the response 
            return res.status(200).send(response)

        } catch (error) {

            logError(`[Error creating user]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error creating user]: unable to create user'
            });

        }

    })
    .delete( verifyToken, async (req, res) => {
        
        let id = req?.query?.id
        let collection = req.params.collection

        try {
            logInfo(`[Deliting user]: ${id}`)
            // controller instance to executed method
            const controller =  new UserController()
            // obtain response
            const response  = controller.deleteUser(collection,id)
            // send to the client the response 
            return res.status(200).send(response)
        } catch (error) {
            logError(`[Error deleting user]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error deleting user]: unable to deleting user'
            });
        }

    })
    .put( verifyToken,jsonParser, upload.any() ,async (req, res) => {
        // obtain a query param
        let id = req?.query?.id;
        let collection = req.params.collection
        let user = req?.body
        console.log('[user update]', user);

          // Validate required properties
          if (!user || !id) {
            return res.status(400).send({
                message: '[Error user data missing]: no user can be update'
            });
        }

        try {
            // controller instance to excute method 
            const controller = new UserController()
            await controller.saveFiles(user, req.files)
            // obtain response 
            const response = await controller.updateUser(collection,id, user)

            // send to the cliente the response
            return res.status(200).send(response)
        } catch (error) {

            logError(`[Error update user]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error update user]: unable to update user'
            });
        }
      
    }) 

export default usersRouter