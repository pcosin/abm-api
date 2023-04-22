import { userEntity } from "../entities/User.entity.js";
import { logError, logSuccess } from "../../utils/logger.js";

export const updateNewDate = async (collection, id, newDate, newEstado) => {

    try {
        let userModel = userEntity(collection)
        console.log('new date:', newDate);
        const updateDateinUser = await userModel.updateOne({_id: id}, {$push: {horas: newDate}, $set:{estado: newEstado} })

        logSuccess('[update user]', updateDateinUser);

        if (!updateDateinUser) {
            throw new Error("User not found");
          }
        return updateDateinUser;
    } catch (error) {
        logError(`[ORM ERROR]: Updating User`, error)
        throw error
    }
    
}