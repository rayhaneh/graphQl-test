const graphQL = require('graphql')
const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat
} = graphQL



const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:  () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    twitter: {type: GraphQLString},
    avatar: {type: GraphQLString},
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/books`)
          .then(res => res.data)
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    rating: {type: GraphQLFloat},
    relatedBooks: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
        return parentValue.relatedBooks.map(id => 
          axios.get(`http://localhost:3000/books/${id}`)
          .then(res => res.data)
        )
      }
    },
    author: {
      type: AuthorType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/authors/${parentValue.authorId}`)
        .then(res => res.data)
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/books/${args.id}`)
          .then(res => res.data)
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/authors/${args.id}`)
          .then(res => res.data)
      }
    }
  }
})


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        rating: { type: GraphQLFloat },
        authorId: { type: GraphQLInt },
        avatar:  {type: GraphQLString },
        relatedBooks: {type: new GraphQLList(GraphQLInt)}
      },
      resolve(parentValue, { title, rating, authorId, avatar, relatedBooks }) {
        return axios.post('http://localhost:3000/books', { title, rating, authorId, relatedBooks })
          .then(res => res.data);
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      }, 
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/books/${id}`)
          .then(res => res.data)
      }
    },
    editBook: {
      type: BookType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        rating: { type: GraphQLFloat },
        authorId: { type: GraphQLInt },
        avatar:  {type: GraphQLString },
        relatedBooks: {type: new GraphQLList(GraphQLInt)}
      }, 
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/books/${args.id}`, args)
          .then(res => res.data)
      }
    }
  },
})



module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery,
})
