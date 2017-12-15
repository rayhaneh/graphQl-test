# GraphiQL Demo
This repository includes a simple GraphQL server which uses [GraphiQL](https://github.com/graphql/graphiql) to send queries to the server. Server fetches data from a REST API provided using [json-server](https://github.com/typicode/json-server). 

## Dependecies
* express
* graphql
* express-graphql
* json-server
* axios

## Getting started
To install:
- `git clone git@github.com:rayhaneh/graphiql-demo.git`
- `npm install`

To run the REST API With [json-server](https://github.com/typicode/json-server):
- `npm run json:server` (this will run on port 3000)

To start graphiQL: 
- `npm start` (this will run on port 4000)

