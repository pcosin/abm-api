import express from 'express'
import bodyParser from 'body-parser'
import verifyToken from '../middlewares/verifyToken.middleware.js'
import { logInfo } from '../utils/logger.js'
import { PosController } from '../controller/PosController.js'

let jsonParser = bodyParser.json()
let posRouter = express.Router()

posRouter.route('/:collection')
    // put => http://localhost:8000/api/pos/:collection
    .put(verifyToken, jsonParser, async (req, res) => {
        
        let id = req.query?.id
        let collection = req.params.collection
        let newDate = req.body.acountDate
        let newEstado = req.body.newEstado


        // Validate required properties
        if (!id || !newDate || !newEstado) {
            return res.status(400).send({
                message: '[Error user data missing]: no user can be post'
            });
        }

        try {
            // controler instance to executed method
            const controller = new PosController()
            const response = await controller.updateNewDate(collection, id, newDate, newEstado)
            // send to the cliente the response
            return res.status(200).send(response)

        } catch (error) {
             logError(`[Error pos user]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error pos user]: unable to pos user'
            });
        }

        
        
    })

export default posRouter