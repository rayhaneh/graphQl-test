const express = require('express');

// Combatibility layer between graphQL and express
const expressGraphQL = require ('express-graphql');
const schema = require('./schema');

const app = express();



app.use('/graphql', expressGraphQL({
  schema,
  graphiql: false,
}));





app.listen(4000, () => {
  console.log('Demo app is listening on port 4000!');
})