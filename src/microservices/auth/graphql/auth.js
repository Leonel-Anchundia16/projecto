const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { KEY_TOKEN } = require("../utils/constant");

const schema = buildSchema(`
type User {
  _id: ID!
  email: String!
  name: String!
  password: String!
}

input UserInput {
  email: String!
  name: String!
  password: String!
}

type Query {
  user(email: String!): User!
  users: [User!]!   # Nueva consulta para obtener todos los usuarios
}

type Mutation {
  signup(userInput: UserInput): User
  login(email: String!, name: String!, password: String!): String
}
`);

const root = {
  users: async () => {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (err) {
      throw err;
    }
  },

  user: async (args) => {
    try {
      const user = await User.findOne({ email: args.email });
      return user;
    } catch (err) {
      throw err;
    }
  },

  signup: async (args) => {
    try {
      const { name, email, password } = args.userInput;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      const result = await user.save();
      return result;
    } catch (err) {
      throw err;
    }
  },

  login: async (args) => {
    try {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        KEY_TOKEN,
        { expiresIn: "1h" }
      );
      return token;
    } catch (err) {
      throw err;
    }
  },
};

const setupGraphQL = (app) => {
  app.use(
    "/auth/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
};

module.exports = { setupGraphQL };
