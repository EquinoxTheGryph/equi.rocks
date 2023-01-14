/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			'sans': ['Nunito', 'system-ui', 'sans-serif'],
			'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
};
