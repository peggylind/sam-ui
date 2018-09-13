import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
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

createApolloServer({ schema });
