import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://netspaces-api:3333/graphql',
    cache: new InMemoryCache(),
});

export default client