import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { useApollo } from '../apollo-client';

function CustomApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialApolloState);
	return (
		<>
			<ApolloProvider client={client}>
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
