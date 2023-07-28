import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import { useApollo } from '../apollo-client';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <ChakraProvider>
            <main className="app">
              <Component {...pageProps} />
            </main>
          </ChakraProvider>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
