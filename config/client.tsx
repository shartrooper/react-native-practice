import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://192.168.0.105:4000',
  }),
});
