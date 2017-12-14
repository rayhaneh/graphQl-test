const express = require('express')
const app = express()

const expressGraphQL = require ('express-graphql')
const schema = require('./schema')

app.use('/graphql', expressGraphQL({
  schema, 
  graphiql: true,
}))

app.listen(4000, () => {
  console.log('Demo app is listening on port 4000!')
})
