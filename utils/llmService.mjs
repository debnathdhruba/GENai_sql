import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { dbConnection , sequelize} from "../dbConnection/dbConnection.mjs";
import userPrompt from "../prompt/userPrompt.mjs";

dotenv.config();


export class LLmService {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      temperature: 0,
      maxRetries: 2,
      apiKey: process.env.GEMINI_API_KEY,
    });
    
  }

  async _setup() {
    try {
      const tableColumsInfoMap = {}  
      const queryInterface = sequelize.getQueryInterface();
      const tables =  await queryInterface.showAllTables()
      for(const table of tables){
        const description = await queryInterface.describeTable(table);
        tableColumsInfoMap[table] = description
      }
       return tableColumsInfoMap

    } catch (error) {
      console.error("Error:", error); 
    }
  }

  async generateResponse(userInput) {
    // await this._dataBaseConn();
    const tableColumsInfoMap = await this._setup();
    const userContent = await userPrompt(userInput, tableColumsInfoMap);
    const message = [
      { role: "system", content: "You are a senior MYSQL developer." },
      { role: "user", content: userContent}
    ];

    try {
      const result = await this.llm.invoke(message);

      // Clean response by removing potential backticks or unwanted formatting
      const cleanResponse = result.content.trim();
      const CleanResponse = cleanResponse.replace(/```json|```/g, "").trim();
      const jsonResponse = JSON.parse(CleanResponse);
      // console.log(jsonResponse.response);
      return jsonResponse.response;
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
}












// const llm = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-pro",
//     temperature: 0,
//     maxRetries: 2,
//     apiKey: process.env.GEMINI_API_KEY,
  
//     // hello
//   });
  
//   const res = async (userInput) => {
//     const message = [
//       { role: "system", content: "You are a senior SQL developer." },
//       { 
//         role: "user", 
//         content: ""
//       }
//     ];
  
//     try {
//       const result = await llm.invoke(message);
  
//       // Clean response by removing potential backticks or unwanted formatting
//       let cleanResponse = result.content.trim();
//       cleanResponse = cleanResponse.replace(/```json|```/g, "").trim();
  
//       const jsonResponse = JSON.parse(cleanResponse);
//       console.log(jsonResponse.response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
  
