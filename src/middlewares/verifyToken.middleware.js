// import { request, response, NextFunction } from 'express'
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// configure dotenv to read enviroment variables 
dotenv.config()

const secret = process.env.SECRETKEY || 'MYSECRETKEY'

let verifyToken = express()

verifyToken.use( (req, res, next) => {

    let token = req.get('x-access-token')
    console.log(token);

    if (!token) {
        return res.status(403).send({
            authenticationError: 'jwt verification falled',
            message: 'falled to verify jwt token in request'
        })
    }

    // verify the token obteined
    jwt.verify(token, secret, (err, decode) => {
        
        if (err) {
            return res.status(500).send({
                authenticationError: 'jwt verification falled',
                message: 'falled to verify jwt token in request'
            })    
        }
    })

    //pass something to next request 
    // execute next function => preotected routes will be executed
    next()
    
})



export default verifyToken