const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./model/book')
const Author = require('./model/author')
const User = require('./model/user')
const MONGODB_URI = "mongodb+srv://marko:Qy5caMdOAbz4hxdq@cluster0.aa7ai.mongodb.net/myLibraryDB?retryWrites=true&w=majority";
console.log('connecting to', MONGODB_URI);

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  }).catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres:[String!]
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
  value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation{

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }
      try {
        const { author, genre } = args
        const foundAuthor = await Author.findOne({ author });
        const foundByGenre = await Book.find({ genres: genre, author: foundAuthor });
        return foundByGenre;
      } catch (error) {
        throw new UserInputError('Book collection search operation failed this time', {
          invalidArgs: args.title,
        })
      }
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("token not authenticated")
      }

      return currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const totalBooks = await Book.find({ author: root })
      return totalBooks.length
    }
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      const foundBook = await Book.findOne({ title: args.title })
      const foundAuthor = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (foundBook) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }

      if (!foundAuthor) {
        const newAuthor = new Author({ name: args.author, born: null })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const findNewAuthor = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: findNewAuthor })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook;
    },
    editAuthor: async (_root, args,context) => {
      const { name, setBornTo } = args;
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.findOne({ name });
        if (!author) {
          return null
        }
        author.born = setBornTo
        await author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})