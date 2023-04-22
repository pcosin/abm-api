import { updateNewDate } from "../domain/orm/Pos.orm.js";
import { logSuccess, logWarning } from "../utils/logger.js";

export class PosController{

    async updateNewDate(collection, id, newDate, newEstado){
        let response = '';

        if (id) {
            logSuccess(`[/api/users] Update User By ID ${id}`)
            await updateNewDate(collection,id, newDate, newEstado).then((r) => {
                return response = {
                        message: `User update successfull: ${id}`
                    }
            })
        }else {
            logWarning(`[/api/users] update user request without id`)
            return response = {
                    message: `Please, provide an id to update from database`
                }
        }
    
        return response
    }
}