import mongoose from 'mongoose'

export const userEntity = (collection) => {
    let userSchema = new mongoose.Schema(
     {  
        profileImage: String,
        // codigoBarras: {},
        identificacion: Number,
        tipoDni: String,
        cuil: Number,
        apellido: String,
        nombre: String,
        telefono: Number,
        fechaNacimiento: String,
        nacionalidad: String,
        grupoSanguineo: String,
        estadoCivil: String,
        nombreConyuge: String,
        hijos: Number | String,
        domicilio: {
            calle: String,
            manzana: String | Number,
            parcela: String | Number,
            entre: String | Number,
            calle1: String,
            calle2: String,
            numero: Number,
            piso: Number,
            depto: String
        },
        localidad: String,
        provincia: String,
        cp: Number,
        pcia: String,
        personalDe: {
            De: String,
            otros: String
        },
        tipoContrato: String,
        contratoEfectivo: {
            altaTempranaAfipEfectivo: String | Boolean,
            figurarNominaArtEfectivo: String | Boolean,
            figurarNominaSeguroVidaEfectivo: String | Boolean,
            poseerPlanillaEPPEfectivo: String | Boolean,
            poseerConstanciaCapacitacionInduccionSeguridadEfectivo:String | Boolean
        },
        contratoContratado: {
            altaTempranaAfipContratado: String | Boolean,
            figurarNominaArtContratado: String | Boolean,
            figurarNominaSeguroVidaContratado: String | Boolean,
            poseerPlanillaEPPContratado: String | Boolean,
            poseerConstanciaCapacitacionInduccionSeguridadContratado:String | Boolean
        },
        contratoMonotributista:{
            constanciaMonotributo: String | Boolean ,
            seguroAccidentesPersonales: String | Boolean ,
            induccionDeSeguridad: String | Boolean ,
            clausulaDeNoRepeticion: String | Boolean
        },
        puestoCargo: String,
        sector: String,
        cuadrilla: Number,
        colorDeCasco: String,
        habilitadoIngreso: String | Boolean,
        vehiculo: String,
        vehiculoPatente: String,
        anotaciones: String,
        estudios:{
                primario: String,   
                secundario: String,   
                terciarioUniviersitario: String,
                otrosConocimientos: String
            },
        datosBancarios: {
            nombreBanco: String,
            sucursal: String,
            numeroCuenta: String,
            numeroCbu: String,
            archivo: String 
        },
        equipoPP: {
            camisa:{
                camisaTalle: String ,
                camisaCantidad: Number,
                camisaTipoModelo: String,
                camisaMarca: String ,
                camisaFechaEntrega:String ,
                camisaCertificacion: String | Boolean ,
                observacionesCamisa:String ,
            },
            pantalon:{
                pantalonTalle: String,
                pantalonCantidad: Number,
                pantalonTipoModelo:String ,
                pantalonMarca: String,
                pantalonFechaEntrega:String ,
                pantalonCertificacion:String | Boolean ,
                observacionesPantalon:String ,
            },
            botas:{
                botasTalle: String,
                botasCantidad: Number ,
                botasTipoModelo: String,
                botasMarca: String ,
                botasFechaEntrega: String ,
                botasCertificacion: String | Boolean ,
                observaciones: String ,
            },
            pullover:{
                pulloverTalle: String ,
                pulloverCantidad: Number ,
                pulloverTipoModelo: String ,
                pulloverMarca: String ,
                pulloverFechaEntrega: String,
                pulloverCertificacion: String | Boolean,
                observacionesPullover: String,
            },
            campera:{
                camperaTalle: String,
                camperaCantidad: Number,
                camperaTipoModelo:String ,
                camperaMarca:String ,
                camperaFechaEntrega: String ,
                camperaCertificacion: String | Boolean ,
                observacionesCampera: String ,
            },
            chaleco:{
                chalecoTalle: String ,
                chalecoCantidad: Number ,
                chalecoTipoModelo: String ,
                chalecoMarca: String ,
                chalecoFechaEntrega:String ,
                chalecoCertificacion: String | Boolean ,
                observacionesChaleco: String ,
            },
            casco:{
                cascoTalle:String ,
                cascoCantidad: Number,
                cascoTipoModelo: String ,
                cascoMarca: String ,
                cascoFechaEntrega: String ,
                cascoCertificacion: String | Boolean ,
                observacionesCasco: String,
            }, 
            otrosElementos:{
                otrosTalle: String,
                otrosCantidad: Number ,
                otrosTipoModelo: String ,
                otrosMarca: String ,
                otrosFechaEntrega: String,
                otrosCertificacion: String | Boolean ,
                observacionesOtros: String ,
            },
            observacionesGenerales:String ,
        },
        estado: String,
        horas: [],
        archivos: []

}
)
    return mongoose.models[collection] || mongoose.model(collection, userSchema)
}