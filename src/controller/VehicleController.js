import { createNewVehicle, getAllVehicles, getVehiclesByPatente, updateVehicleByID, deleteVehicleByID } from "../domain/orm/Vehicle.orm.js";
import { logSuccess, logWarning } from "../utils/logger.js";
export class VehicleController {
    // TODO  modificar eliminar 
    async createVehicle(collection, vehicle){
        let response = "";

        if (vehicle) {
            logSuccess(`[/api/vehicle/:collection] Create new vehicle successful`, vehicle.patente)
            response = await createNewVehicle(collection, vehicle)
        }else{
            logWarning(`[/api/vehicle/:collection] Register needs vehicle entity `)
            response = {
                message: `Vehicle not created. Please, provide a vehicle entity to create one`
            }
        }

        return response
    }

    async getVehicles(collection){

        let response = "";
        logSuccess(`[/api/vehicle/:collection] Get All Vehicles Request`)
        return response = await getAllVehicles(collection)
    }

    async findVehiclesByPatente(collection,patente) {
        let response = '' 
        if (patente) {
            logSuccess(`[/api/users] find User By patente:  ${patente}`)
            response = await getVehiclesByPatente(collection, patente)
             response
        }else{
            logWarning(`[/api/vehicle/:collection] Register needs vehicle patente `)
             response = {
                 message: `Vehicle not find. Please, provide a vehicle patente to find`
             }
        }

        return response
    }


    async updateVehicle(collection, id, vehicle){
        let response = '';

        if (id) {
        
            logSuccess(`[/api/users] Update User By ID ${id}`)
            await updateVehicleByID(collection,id, vehicle).then((r) => {
                response = {
                        message: `User vehicle successfull: ${id}`
                    }
            })
        
        }else {
            
            logWarning(`[/api/users] update vehicle request without id`)
                response = {
                    message: `Please, provide an id to update from database`
                }

        }
        return response
    }

    async deleteVehicle(collection, id){
          
        let response = ''

        if (id) {
            logSuccess(`[/api/vehicles] Delete vehicle successful`)
            await deleteVehicleByID(collection,id).then(() => {
            return response = {
                    message: `vehicle delete successfull: ${id}`
                }
            })
        }else{
            logWarning(`[/api/vehicles] delete vehicle request without id`)
            return response = {
                message: `Please, provide an id to remove from database`
            }
        }

         return response
    }

    async saveFilesVehicle (vehicle, files){

        let arrayArchivos = []
        files.map( file => {
            arrayArchivos.push(file.path)
        })

        vehicle.archivos = arrayArchivos
    }

    async deleteFile(collection, vehiclePatente, file){
        try {
            // const user = await getUserByID(collection, '6423aba0facf5b2e25720857')
            const vehicle = await getVehiclesByPatente(collection, vehiclePatente)
            if (!vehicle) {
              return res.status(404).json({ message: 'Vehiculo no encontrado' });
            }

            const archivos = vehicle.archivos
            
            // Buscar la ruta del archivo en la matriz de archivos del vehiculo
            const fileIndex = await archivos.findIndex((filePath) => filePath.includes(file));
            if (fileIndex === -1) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
            }

            // Eliminar la ruta del archivo de la matriz del vehiculo
            vehicle.archivos.splice(fileIndex, 1);
            // Actualizar el registro de vehiculo en la base de datos
            await vehicle.save();

        }catch(err){
            console.log('[OCURRIO UN ERROR] ' + err);
        }
    }
}