import { userEntity } from "../entities/User.entity.js";
import { logError } from "../../utils/logger.js";

//crud
/**
 * method to obtain all userss from collection "Users" in mongo server
 */
export const getAllUsers = async (collection) => {

    try {
        let userModel = userEntity(collection)
        // search all users
        return await userModel.find({isDelete:false})
    } catch (error) {
        logError(`[ORM ERROR]: getting all users: ${error}`)
    }

}

// get user by id
export const getUserByID = async (collection,id) => {

    try {
        let userModel = userEntity(collection);
        //search user by id
        return await userModel.findById(id)
    } catch (error) {
        logError(`[ORM ERROR] Getting All Users: ${error}`)
    }
    
}

// findUsers
export const getUsersByname = async (collection, apellido) => {

    try {
        let userModel = userEntity(collection);
        //search user by id
        return await userModel.find( { apellido: { $eq: apellido } })

    } catch (error) {
        logError(`[ORM ERROR] Getting All Users: ${error}`)
    }
    
}

export const getUserByDni = async (collection,dni) => {
    try {
        let userModel = userEntity(collection);
        //search user by id
        return await userModel.findOne( { identificacion: dni })
        // return await userModel.find( { identificacion: dni })

    } catch (error) {
        logError(`[ORM ERROR] Getting All Users: ${error}`)
    }
}

// Create new user
export const createNewUser = async (collection,user) => {

    try {
        let userModel = userEntity(collection)
        return await userModel.create(user)
    
    } catch (error) {
        logError(`[ORM ERROR] Creatin new user: ${error}`)
        throw new Error("[ORM ERROR] Creatin new user: ${error}");
    }

}
// Delete user by id 
export const deleteUserByID = async (collection,id) => {

    try {
        let userModel = userEntity(collection)
        return await userModel.deleteOne({_id: id})
    } catch (error) {
        logError(`[ORM ERROR] Deleting user by id: ${error}`) 
    }

}

// update user by id
export const updateUserByID = async (collection,id, user) => {

    try {
        let userModel = userEntity(collection)
        // update user
        const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true });
        // console.log(updatedUser,'update user');
        if (!updatedUser) {
            throw new Error("User not found");
          }
        return updatedUser;
        
    } catch (error) {
        logError(`[ORM ERROR]: Updating User`, error)
        throw error
    }
}