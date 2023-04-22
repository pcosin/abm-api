
// import fs from 'fs';


// import bwipjs from 'bwip-js';
// import util, { promisify } from 'util';
// const writeFilePromise = util.promisify(fs.writeFile);
// const toBufferAsync = promisify(bwipjs.toBuffer);

// export const generatedCodeB = async (code) => {
//   const barcodeParams = {
//     bcid: 'code128',
//     text: `${code}`,
//     scale: 2,
//     height: 10,
//     includetext: true,
//     textxalign: 'center'
//   };

//   try {
//     const png = await toBufferAsync(barcodeParams);

//     if (!fs.existsSync(`static/${code}`)) {
//       fs.mkdirSync(`static/${code}`, { recursive: true });
//     }
//     const filePath = `static/${code}/${code}.png`;
//     await writeFilePromise(filePath, png);

//     console.log('Archivo del código de barras guardado correctamente');
//     return filePath;
//   } catch (error) {
//     console.log('Error al guardar el archivo del código de barras:', error);
//     throw error;
//   }
// };

// import  bwipjs from 'bwip-js'
// import fs from 'fs'
 
// export const generatedCodeB = async (code) => {
  
//   return await new Promise((resolve, reject) => {
//   const barcodeParams = {// Define los parámetros del código de barras
//       bcid: 'code128',  // Tipo de código de barras a generar
//       text: `${code}` , // Número de DNI a utilizar
//       scale: 2, // Escala del código de barras
//       height: 10, // Altura del código de barras
//       includetext: true, // Incluir el texto en el código de barras
//       textxalign: 'center' // Alineación del texto en el código de barras
//   };

//         // Genera el código de barras
//   bwipjs.toBuffer(barcodeParams,  function (err, png) {
//     if (err) {
//         // Manejar el error
//         console.log('error al generar el cb:', err);
//     } else {
//         // Utiliza el PNG generado en tu aplicación
//         if (!fs.existsSync(`static/${code}`)) {
//                 fs.mkdirSync(`static/${code}`, { recursive: true });
//               }
//         const filePath = `static/${code}/${code}.png`;
//          fs.writeFile(filePath, png, (err) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(filePath);
//             }
//         });
//         }
// });

// })
// }

// async function guardarCodigoBarrasEnArchivo(png,newUrl) {
//     const filePath = `./static/${newUrl}.png`;

//     // Guarda el archivo PNG en la carpeta de estáticos
//      fs.writeFile(filePath, png,  function(err) {
//         if (err) {
//             // Maneja el error
//             console.log('El archivo de código de barras NO se ha guardado correctamente', err);
//         } else {
//             console.log('El archivo de código de barras se ha guardado correctamente');
            
//         }
//     });
// }

import bwipjs from 'bwip-js';
import fs from 'fs-extra'
import path from 'path';
import fsSync from 'fs'

export async function generateBarcode(text) {
  const pngBuffer = await bwipjs.toBuffer({
    bcid: 'code128', // Tipo de código de barras que deseas generar
    text, // El texto que deseas convertir en código de barras
    scale: 3, // Escala del código de barras
    height: 10, // Altura del código de barras
    includetext: true, // Incluir el texto en el código de barras
    textxalign: 'center', // Alineación horizontal del texto dentro del código de barras
  });

  const filename = `${text}.png`;
  const filepath = `static/${text}/${filename}`;
  await fs.outputFile(filepath, pngBuffer);

  console.log(`El archivo ${filename} ha sido creado exitosamente en la carpeta static`);

  
}






// export const generatedCodeB = async (code) => {
//   const barcodeParams = {
//     bcid: 'code128',
//     text: `${code}`,
//     scale: 2,
//     height: 10,
//     includetext: true,
//     textxalign: 'center'
//   };

//   return new Promise((resolve, reject) => {
//     bwipjs.toBuffer(barcodeParams, (err, png) => {
//       if (err) {
//         reject(err);
//       } else {
//         if (!fs.existsSync(`static/${code}`)) {
//           fs.mkdirSync(`static/${code}`, { recursive: true });
//         }
//         const filePath = `static/${code}/${code}.png`;
//         fs.writeFile(filePath, png, (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(filePath);
//           }
//         });
//       }
//     });
//   });
// };



