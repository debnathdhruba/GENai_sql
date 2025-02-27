// import { GoogleGenerativeAI } from "@google/generative-ai";

 
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const googleAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const geminiConfig = {
//   temperature: 0.9,
//   topP: 1,
//   topK: 1,
//   maxOutputTokens: 4096,
// };
 
// const geminiModel = googleAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
//   geminiConfig,
// });
 
// const generate = async (userInput) => {
//   try {

//     const result = await geminiModel.generateContent({
       
//     });
//     const response = result.response;
//     console.log(response.text());
//   } catch (error) {
//     console.log("response error", error);
//   }
// };
 
// generate("tell me a joke ");



import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GEMINI_API_KEY,

  // hello
});

const res = async (userInput) => {
  const message = [
    { role: "system", content: "You are a senior SQL developer." },
    { 
      role: "user", 
      content: `Generate only a valid JSON response with a MySQL query, without explanations. Use the following format:
     '''json
      {
        "response": {
          "query": "INSERT INTO employee (name, age, category) VALUES ('John', 30, 'IT');"
        }
      }
      Do not include any additional text, comments, or Markdown formatting. Now, generate the MySQL query for: "${userInput}"`
    }
  ];

  try {
    const result = await llm.invoke(message);

    // Clean response by removing potential backticks or unwanted formatting
    let cleanResponse = result.content.trim();
    cleanResponse = cleanResponse.replace(/```json|```/g, "").trim();

    const jsonResponse = JSON.parse(cleanResponse);
    console.log(jsonResponse.response);
  } catch (error) {
    console.error("Error:", error);
  }
};

res("find all the employees who are highest earners in their respective category");


/*
1.database connectivity , orm ar sathe --- > sequalize node.js
2. user ,database -- info like:
{
 db_name,
 table_name,
 port_number,
 password,
 others...
  
}
3. genai--table info feed korte hobe
4. human language a query dite hobe 
 

*/