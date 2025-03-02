import express, { response } from 'express';
import { LlmService } from '../utils/llmService.mjs';
import { sequelize } from '../dbConnection/dbConnection.mjs';
const router = express.Router();


// initialize controller of the LLM service 
router.post('/llmService', async(req, res) => {
  const { userInput } = req.body;

 const llmService = new LlmService()
 const llmresponse = await llmService.generateResponse(userInput)
 const [results] = await sequelize.query(llmresponse.query)
  res.status(200).json({
     results: results
  })




})

export default router;



