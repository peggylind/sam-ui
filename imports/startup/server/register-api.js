import { createApolloServer } from "meteor/apollo";
//import { makeExecutableSchema } from "graphql-tools";
import { getUser } from "meteor/apollo";
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server';
import { WebApp } from 'meteor/webapp'
//import { makeExecutableSchema } from "graphql-tools";
import merge from "lodash/merge";
import UsersSchema from "../../api/users/User.graphql.js";
import UsersResolvers from "../../api/users/resolvers";
import samResolvers from "../../api/sam_citizens/resolvers";
import samSchemas from "../../api/sam_citizens/sam_citizens.graphql.js";
import { setup } from 'meteor/swydo:ddp-apollo';

const typeDefs = [UsersSchema, samSchemas];

const resolvers = merge(UsersResolvers, samResolvers);


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

setup({
  schema
});

//createApolloServer({ schema });

const server = new ApolloServer({schema});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// server.applyMiddleware({
//   app: WebApp.connectHandlers,
//   path: '/graphql'
// })
//
// WebApp.connectHandlers.use('/graphql', (req, res) => {
//   if (req.method === 'GET') {
//     res.end()
//   }
// })

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   console.log(resolvers)
// });
