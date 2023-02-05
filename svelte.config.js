import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			// $lib and $lib/server are built in
			'$static': 'static',
			'$components': 'src/lib/components', // A library of reusable Svelte components
			'$stores': 'src/lib/stores', // Svelte stores
			'$models': 'src/lib/models', // Models carry data and applies any filters or validation rules
			'$filters': 'src/lib/filters', // Filters convert data from one format to another
			'$validators': 'src/lib/validators' // Validators makes sure the data is correctly supplied
		},
	}
};

export default config;
