import { getUserByID, getAllUsers, createNewUser, deleteUserByID, updateUserByID, getUsersByname, getUserByDni } from "../domain/orm/User.orm.js";
import { logSuccess, logWarning } from "../utils/logger.js";

export class UserController {

    async getUsers( collection,id=null ) {

        let response = '';

        if (id) {
            logSuccess(`[/api/users] Get User By ID ${id}`)
            response = await getUserByID(collection,id)
        }else {
            logSuccess(`[/api/users] Get All Users Request`)
            response = await getAllUsers(collection)
        }

        return response
    }

    async createUser(collection,user) {

        let response = ''

        if (user) {
            logSuccess(`[/api/users] Create new user successful`, user.nombre)
            await createNewUser(collection,user)
            response = { message: 'User created successfully' }
        }else{
            logWarning(`[/api/users] Register needs user entity `)
            response = {
                message: `User not created. Please, provide a user entity to create one`
            }
        }

        return response
    }

    async deleteUser(collection,id) {
        
        let response = ''

        if (id) {
            logSuccess(`[/api/users] Delete user successful`)
            await deleteUserByID(collection,id).then(() => {
            return response = {
                    message: `User delete successfull: ${id}`
                }
            })
        }else{
            logWarning(`[/api/users] delete user request without id`)
            return response = {
                message: `Please, provide an id to remove from database`
            }
        }

         return response
    }

    async updateUser(collection,id, user) {
        
        let response = '';

        if (id) {
        
            logSuccess(`[/api/users] Update User By ID ${id}`)
            await updateUserByID(collection,id, user).then((r) => {
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

    async findUsersByname(collection,apellido) {
        let response = '' 
        logSuccess(`[/api/users] find User By apellido:  ${apellido}`)
        response = await getUsersByname(collection, apellido)
        return response
    }

    async findUserByDni(collection, dni){
        let response = '' 
        logSuccess(`[/api/users] find User By dni:  ${dni}`)
        response = await getUserByDni(collection, dni)
        return response
    }

    async saveFiles (user, files){

        let arrayArchivos = []
        files.map( file => {
            arrayArchivos.push(file.path)
        })

        user.archivos = arrayArchivos
    }

    async deleteFile(collection, userDni, file){
        try {
            // const user = await getUserByID(collection, '6423aba0facf5b2e25720857')
            const user = await getUserByDni(collection, userDni)
            if (!user) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const archivos = user.archivos
            
            // Buscar la ruta del archivo en la matriz de archivos del usuario
            const fileIndex = await archivos.findIndex((filePath) => filePath.includes(file));
            if (fileIndex === -1) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
            }

            // Eliminar la ruta del archivo de la matriz del usuario
            user.archivos.splice(fileIndex, 1);
            // Actualizar el registro de usuario en la base de datos
            await user.save();

        }catch(err){
            console.log('[OCURRIO UN ERROR] ' + err);
        }
    }
}