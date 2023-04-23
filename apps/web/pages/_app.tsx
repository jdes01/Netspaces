import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to web!</title>
			</Head>
			<ChakraProvider>
				<main className="app">
					<Component {...pageProps} />
				</main>
			</ChakraProvider>
		</>
	);
}

export default CustomApp;
