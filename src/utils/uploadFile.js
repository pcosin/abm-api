import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { UserController } from '../controller/UserController.js';
import { VehicleController } from '../controller/VehicleController.js';

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        let collection = req.params.collection
        // Crear una carpeta para el usuario dentro de la carpeta "static"
        const nameFolder = req.body.identificacion || req.body.patente; 
        const pathFolder = path.join('static',nameFolder);
        // fs.mkdirSync(pathFolder, { recursive: true });
        
          // Verificar si la carpeta ya existe
        if (!fs.existsSync(pathFolder)) {
          // Si no existe, crear la carpeta
          fs.mkdirSync(pathFolder, { recursive: true });
        }

         // Verificar si el archivo ya existe
        const filePrefix = file.fieldname + '-';
        const filesInFolder = fs.readdirSync(pathFolder);
        const existingFile = filesInFolder.find((fileName) => fileName.startsWith(filePrefix));
        if (existingFile) {
            // return cb(new Error('El archivo ya existe'));
            // Eliminar el archivo existente
            if (req.body.identificacion) {
              const controller = new UserController()
              await controller.deleteFile(collection, req.body.identificacion, filePrefix)
            }else{
              const controller = new VehicleController()
              await controller.deleteFile(collection, req.body.patente, filePrefix)
            }
           
            
            fs.unlinkSync(path.join(pathFolder, existingFile));
            
        }


        cb(null, pathFolder);
      },
      filename: function(req, file, cb) {
        // Generar un nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
    
    });
     


export const upload = multer({ storage: storage });