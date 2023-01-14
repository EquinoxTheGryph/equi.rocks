const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			zIndex: {
				popup: 20,
				nav: 10,
				modal: 5,
			},
			height: {
				nav: '2.5em'
			},
			colors: {
				/**
				 * DEFAULT: Light theme
				 * dark: Dark theme
				 */
				primary: {
					DEFAULT: colors.zinc[100],
					dark: colors.zinc[800],
				},
				secondary: {
					DEFAULT: colors.sky[300],
					dark: colors.sky[700],
				},
				background: {
					DEFAULT: colors.zinc[100],
					dark: colors.zinc[800],
				},
				text: {
					DEFAULT: colors.zinc[800],
					dark: colors.zinc[100],
				}
			}
		},
		fontFamily: {
			sans: ['Nunito', 'system-ui', 'sans-serif'],
			mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
	darkMode: 'class' // Uncomment to use system defaults
};
