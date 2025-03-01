
// const CodeGeneration = [
//     {
//         "prompt":"file_path",
//         "version":"1.0",
//         "requiredInpust":[{
//             "filePath":{
//                 "type":"string",
//                 "description":"The path to the file to be generated"
//             },
//             "associatedCode":{
//                 "type":"string",
//                 "description":"The code to be generated"
//             },
//             "issues":
//                 {
//                     "type":"array",
//                     "properties":{
//                         "originalErrorMessages":{
//                             "type":"string",
//                             "description":"The original error messages"
//                         },
//                         "category":{
//                             "type":"string",
//                             "description":"The category of the error"
//                         }
//                     }

//                 }
            
//         }]
//     }
// ]


// const requiredInpust = CodeGeneration[0].requiredInpust[0];
// console.log(requiredInpust.issues.properties)

// const userInput = {
//     "filePath":"./test.js",
//     "associatedCode":"string",
//     "issues":[
//         {
//             "originalErrorMessages":"Error: error",
//             "category":90
//         }
//     ]
// }

// const validationInputs = (requiredInpust,userInput)=>{
//     // check if all required inputs are present
//      for(const key in requiredInpust){
//          if(!userInput[key]){
//              return false
//          }
//      }
//     //  check if all required inputs are of the right type
//      for(const key in requiredInpust){
//         // console.log(typeof userInput[key],requiredInpust[key].type)
//          if(typeof userInput[key] !== requiredInpust[key].type){
//              return false
//          }
//      }

//      // check if all the issues properties are in right type

//      for(const key in requiredInpust.issues.properties){
//         console.log(key)
//         // console.log(typeof userInput.issues[0][key],requiredInpust.issues.properties[key].type)
//         if(typeof userInput.issues[0][key] !== requiredInpust.issues.properties[key].type){
//             return false
//         }
//     }
//          return true

//     // for(const [key, value] in Object.keys(requiredInpust)){
        
//     // }
//     }



// const isValid = validationInputs(requiredInpust,userInput);
// console.log(isValid)

// const { Sequelize } = require('sequelize');
import Sequelize from 'sequelize';

const sequelize = new Sequelize('example', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

const dbConnection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
} 

await dbConnection()

