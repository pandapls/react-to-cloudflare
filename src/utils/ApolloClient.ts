// src/graphql/client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
const apiUrl = 'http://www.pandatest.site';

// 创建 Apollo Client 实例
export const client = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;
