import express from 'express';
import { VehicleController } from '../controller/VehicleController.js';
import { logInfo, logError } from '../utils/logger.js';
import bodyParser from 'body-parser'
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { upload } from '../utils/uploadFile.js';

let jsonParser = bodyParser.json()
let vehicleRouter = express.Router()

vehicleRouter.route('/:collection')
    .get(verifyToken, async (req, res) => {
        let collection = req.params.collection

        let patente = req.query?.patente
        let response = "";

        console.log(patente, 'patente');
       try {
        if (patente) {
            // controller instance to excute method
            const controller = new VehicleController()
            // obtain response
            response = await controller.findVehiclesByPatente(collection,patente)

            return res.status(200).send(response)
        }
        else{
            // controller instance to excute method
            const controller = new VehicleController()
            // obtain response
            response = await controller.getVehicles(collection)

            return res.status(200).send(response)    
        }
       } catch (error) {
            logError(`[Error find vehicle]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error find vehicle]: unable to find vehicle'
            });
       }
        

    })
    .post(verifyToken, jsonParser, upload.any(), async (req, res ) => {
       
        // obtain parameters of body 
        let vehicle = req?.body

        let collection = req.params.collection
        console.log('collection', collection);

        if (!vehicle || !vehicle.patente) {
            return res.status(400).send({
                message: '[Error vehicle data missing]: no vehicle can be registered'
            });
        }

        // vehicle.archivos = req.files
         // controller instance to executed method
         const controller =  new VehicleController()

        try {
            // obtain response
            await controller.saveFilesVehicle(vehicle, req.files)
            const response  = await controller.createVehicle(collection,vehicle)
            logInfo(`[Vehicle acepted]: ${vehicle.patente} `)
            // send to the client the response 
            return res.status(200).send(response)
        } catch (error) {
             // send to the cliente the response
             return res.status(500).send({
                message: '[Error vehicle data missing]: no vehicle can be registered'
              })
        }


    })
    .put(verifyToken, jsonParser, upload.any(), async (req, res) => {
       
        let id = req?.query?.id;
        let collection = req.params.collection
        let vehicle = req?.body
        // console.log('user update', user);

        // Validate required properties
        if (!vehicle || !id) {
            return res.status(400).send({
                message: '[Error vehicle data missing]: no vehicle can be update'
            });
        }

        try {
            // controller instance to excute method 
            const controller = new VehicleController()
            await controller.saveFilesVehicle(vehicle, req.files)
            // obtain response 
            const response = await controller.updateVehicle(collection,id, vehicle)

            // send to the cliente the response
            return res.status(200).send(response)
        } catch (error) {

            logError(`[Error update vehicle]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error update vehicle]: unable to update vehicle'
            });
        }
    })
    .delete(verifyToken, async (req, res) => {
        let id = req?.query?.id
        let collection = req.params.collection

        try {
            logInfo(`[Deliting vehicle]: ${id}`)
            // controller instance to executed method
            const controller =  new VehicleController()
            // obtain response
            const response  = controller.deleteVehicle(collection,id)
            // send to the client the response 
            return res.status(200).send(response)
        } catch (error) {
            logError(`[Error deleting vehicle]: ${error.message}`);
            // send to the cliente the response
            return res.status(500).send({
                message: '[Error deleting vehicle]: unable to deleting vehicle'
            });
        }
    })
    
export default vehicleRouter