import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo-client';

function CustomApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialApolloState);
	return (
		<>
			<ApolloProvider client={client}>
				<Head>
					<title>Welcome to web!</title>
				</Head>
				<ChakraProvider>
					<main className="app">
						<Component {...pageProps} />
					</main>
				</ChakraProvider>
			</ApolloProvider>
		</>
	);
}

export default CustomApp;
