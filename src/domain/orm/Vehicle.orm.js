import { vehicleEntity } from "../entities/Vehicle.entity.js";
import { logError } from "../../utils/logger.js";

export const createNewVehicle = async (collection, vehicle) => {
    try {
        let vehicleModel = vehicleEntity(collection)
        return await vehicleModel.create(vehicle)
    
    } catch (error) {
        logError(`[ORM ERROR] Creatin new vehicle: ${error}`)
    }
}

export const getAllVehicles = async (collection) => {
    try {
        let vehicleModel = vehicleEntity(collection)

        return await vehicleModel.find({isDelete:false})
    } catch (error) {
        logError(`[ORM ERROR]: getting all vehicle: ${error}`)
    }
}

// findUsers
export const getVehiclesByPatente = async (collection, patente) => {

    try {
        let vehicleModel = vehicleEntity(collection);
        //search vehicle by id
        return await vehicleModel.findOne( { patente: { $eq: patente } })

    } catch (error) {
        logError(`[ORM ERROR] Getting vehicle: ${error}`)
    }
    
}


export const updateVehicleByID = async (collection, id, vehicle) => {
    try {
        
        let vehicleModel = vehicleEntity(collection)

        const updatedVehicle = await vehicleModel.findByIdAndUpdate(id, vehicle, { new: true });

        if (!updatedVehicle) {
            throw new Error("User not found");
          }
        return updatedVehicle;

    } catch (error) {
        logError(`[ORM ERROR]: Updating Vehicle`, error)
        throw error
    }
}

export const deleteVehicleByID = async (collection, id) => {
    try {
        let vehicleModel = vehicleEntity(collection)
        return await vehicleModel.deleteOne({_id: id})
    } catch (error) {
        logError(`[ORM ERROR] Deleting vehicle by id: ${error}`) 
    }
}