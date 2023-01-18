const colors = require('tailwindcss/colors');

const customColorTheme = {
	50: '#fffbfb',
	100: '#f2dcdc',
	200: '#e4bebe',
	300: '#c98888',
	400: '#a15151',
	500: '#781a1a',
	600: '#5e0606',
	700: '#430000',
	800: '#280000',
	900: '#0d0000',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			zIndex: {
				popup: 20,
				nav: 10,
				modal: 5
			},
			height: {
				nav: '2.5em',
				navMobile: '4em',
			},
			colors: {
				own: customColorTheme,
				/**
				 * DEFAULT: Light theme
				 * dark: Dark theme
				 */
				primary: {
					DEFAULT: customColorTheme[100],
					dark: customColorTheme[800]
				},
				secondary: {
					DEFAULT: customColorTheme[300],
					dark: customColorTheme[700]
				},
				background: {
					DEFAULT: customColorTheme[100],
					dark: customColorTheme[800]
				},
				text: {
					DEFAULT: customColorTheme[800],
					dark: customColorTheme[100]
				}
			}
		},
		fontFamily: {
			sans: ['Nunito', 'system-ui', 'sans-serif'],
			mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
		}
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class' // Uncomment to use system defaults
};
