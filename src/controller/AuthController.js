import { loginUser } from "../domain/orm/Auth.orm.js";
import { logSuccess, logError, logWarning } from "../utils/logger.js";

export class AuthController {

    // login
    async loginUser(auth) {

        let response = ''

        if (auth) {
            logSuccess(`[/api/auth/login] logged in user:${auth.email}`)
            let data = await loginUser(auth)
            response = {
                token: data.token,
                message: `Welcome, ${data.user.nombre}`,
                rol: data.user.rol
            }
        }else{
            logWarning(`[/api/auth/register] Register needs auth entity (email & password) `)
            response = {
                error: "[Auth ERROR]: email & password are neded",
                message: `Please, provide a email & password to login`
            }
        }

        return response
    }
}