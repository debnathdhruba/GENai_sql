import express from 'express';
import { LLmService } from '../utils/llmService.mjs';
import { sequelize } from '../dbConnection/dbConnection.mjs';
const router = express.Router();


// initialize controller of the LLM service 
router.post('/llmService', async(req, res) => {
  const { userInput } = req.body;

 const llmService = new LLmService()
 const llmresponse = await llmService.generateResponse(userInput)
 const [results, metadata] = await sequelize.query(llmresponse.query)
  res.status(200).json({
     results: results,
     query: llmresponse.query,
   
  })




})

export default router;



