import { logError } from "../../utils/logger.js";
// bcrypt for password
// import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { authEntity } from "../entities/Auth.entity.js";

dotenv.config()
// obtain secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

// Login User
export const loginUser = async(auth) => {
    try {
        
        let authModel = authEntity()

        let userFound = undefined;
       

        await authModel.findOne({email: auth.email}).then((user) => {
            userFound = user
        }).catch((err) => {
            console.error('[ERROR Autehntication in ORM]: USER NOT FOUND')
            throw new Error(`[ERROR Autehntication in ORM]: USER NOT FOUND: ${err}`);
        })

        let validPassword = auth.password === userFound.password
        if (!validPassword) {
            // TODO not authorised (401)
            console.error('[ERROR Autehntication in ORM]: Password not valid')
            throw new Error(`[ERROR Autehntication in ORM]: Password not valid`);
            // return {
            //     message: 'error en los datos proporcionados'
            // }
        }

        //create JWT
        let token = jwt.sign({email: userFound.email}, secret ,{
            expiresIn:"24h"
        })

        return {
            user: userFound,
            token: token
        } 

    } catch (error) {
        logError(`[ORM ERROR] Creating user ${error}`)
    }
}