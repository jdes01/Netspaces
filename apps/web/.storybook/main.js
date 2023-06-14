const config = {
	stories: ['../**/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
	addons: ['@storybook/addon-essentials', '@chakra-ui/storybook-addon', "storybook-addon-apollo-client"],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
