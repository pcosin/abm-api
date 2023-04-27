import express from 'express';
import mongoose from 'mongoose'
import { logSuccess } from '../utils/logger.js';
import bodyParser from 'body-parser';
//swagger
import swagger from 'swagger-ui-express';

// security
import cors from 'cors';
// import helmet from 'helmet';

// Root routes
// // TODO router
import router from '../routes/index.js'

// * create express app
const server = express()

// * contentType config
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// server.use(express.urlencoded({extended: true }))
// server.use(express.json())

// * Static folder
server.use(express.static('static'))

 // * define server  to use /api and use rootRouter from index.ts in routes 
 // from this point onover: http://localhost:8000/api/
 server.use('/api',router)

// TODO mongoose conection

// mongoose.connect('mongodb://127.0.0.1:27017/montelectro')
mongoose.connect('mongodb+srv://ppromedio:ppromedio123@cluster0.cx37b5n.mongodb.net/montelectro')
.then(() => {
   logSuccess("DB CONECTADA")
})
.catch((err) => {
   console.log(`EROR: ${err}`);
   
})

// TODO security
// * security config
//  server.use(helmet());
//  server.use(cors());
 server.use(cors({
  origin: ['https://www.desarrollosmonigote.com', 'https://desarrollosmonigote.com/abm/pages/horarios.html']
}));



// * redirection config
// http://localhost:8000/ => http://localhost:8000/api/
server.get('/', (req, res) => {

    res.redirect('/api')

})

export default server
