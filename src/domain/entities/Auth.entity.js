import mongoose from 'mongoose'

export const authEntity = () => {

    let authSchema = new mongoose.Schema(
        {
            nombre: String,
            email: String,
            password: String,
            rol: String
        }
    )
    
    return mongoose.models.admins || mongoose.model('admins', authSchema)
}

