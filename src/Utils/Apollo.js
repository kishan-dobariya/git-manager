import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      console.log("TCL: graphQLErrors", graphQLErrors);
    }
  },
});

export { client, ApolloProvider, };
