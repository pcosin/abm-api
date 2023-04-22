import mongoose from "mongoose";

export const vehicleEntity = (collection) => {

    let vehicleSchema = new mongoose.Schema(
        {
            patente: String,
            marca: String,
            modelo: String,
            vtoSeguro: Date,
            vtoVtvKms: String,
            ultimoService: Date,
            cedulaAzul: String,
            polizaSeguro: String,
            vtoPoliza: Date,
            permisoManejo: String,
            constInscripcion: String,
            personalCargo: String,
            archivos: []
        }
    ) 
    return mongoose.models[collection] || mongoose.model(collection, vehicleSchema)
}