// Credits: https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';

import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const apiHttpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}`,
});

const bookingApiHttpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BOOKING_API_URL}`,
});

const link = split(
  (operation) =>
    operation.operationName === 'GetSpaceUnavailableDates' ||
    operation.operationName === 'GetBookingsBySpace' ||
    operation.operationName === 'CreateBooking',
  bookingApiHttpLink,
  apiHttpLink,
);

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(), // set to true for SSR
    link,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept-Language': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Apollo-Require-Preflight': 'true',
      'x-apollo-operation-name': 'graphql post',
    },
    ssrMode: typeof window === 'undefined',
  });
}

export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
