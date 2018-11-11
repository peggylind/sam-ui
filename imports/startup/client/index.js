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


const client = new ApolloClient({
//  uri: '/graphql',
//  link: from([authLink, httpLink]),
  link: new DDPLink(),
  cache: new InMemoryCache()
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
