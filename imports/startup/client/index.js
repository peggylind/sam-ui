import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, from } from "apollo-link";
//import ApolloClient from 'apollo-boost'
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DDPLink } from 'meteor/swydo:ddp-apollo';

import App from "../../ui/App";

//to consider: there's ways of putting context into the client:
//https://www.apollographql.com/docs/react/api/react-apollo.html

// const httpLink = new HttpLink({
//   uri: Meteor.absoluteUrl("graphql")
// });

// const authLink = new ApolloLink((operation, forward) => {
//   const token = Accounts._storedLoginToken();
//   operation.setContext(() => ({
//     headers: {
//       "meteor-login-token": token
//     }
//   }));
//   return forward(operation);
// });
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      samcity: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'SamCitizen', id: args.household_id }) //or should I make a SamHouse type??? https://www.apollographql.com/docs/react/advanced/caching.html#cacheRedirect
    },
  },
});

const client = new ApolloClient({
//  uri: '/graphql',
//  link: from([authLink, httpLink]),
  link: new DDPLink(),
  cache
});
// const client = new ApolloClient({
//   uri: '/graphql',
//   request: operation =>
//     operation.setContext(() => ({
//       headers: {
//         authorization: Accounts._storedLoginToken()
//       }
//     }))
// })

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById("app"));
});
