export default async function userPrompt(userInput, tableColumsInfoMap){
  const tableColoumnDetails =async()=>{
    for(const[key,val] of Object.entries(tableColumsInfoMap)){
      return `Table: ${key} ColumnsDetails: ${JSON.stringify(val)}/n`
    }
  }
    const promt = `
    I recived the Tables name and the columns details based in this information I ,generate a valid MySQL query that precisely translates this natural language request. Return ONLY a JSON object in this exact format:
   {
     "response": {
           "query": "YOUR_SQL_QUERY_HERE",
           "explanation": "EXPLANATION_HERE"
         } 
    }

Guidelines for query generation:
- Support complex operations: JOINs, subqueries, aggregations (COUNT, SUM, AVG), GROUP BY, HAVING, window functions
- Handle temporal data with appropriate DATE/TIME functions
- Use parameterized queries with placeholders (?) for user inputs
- Include proper indexing hints when performance is mentioned
- Support transaction syntax when needed (BEGIN, COMMIT, etc.)
- Implement database-specific optimizations where appropriate
- Follow standard SQL security practices
- make sure to include the explanation of the query in the explanation field.

Do not include comments, explanations, or any text outside the JSON structure.


The necessary information for the query  like the table name and the columns details and the natural language request described
below and separated by a three hyphens (---).

---

Natural language request: "${userInput}",
Table and columns details: ${await tableColoumnDetails()}

---
  `;
  return promt;
};
