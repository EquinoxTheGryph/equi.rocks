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
    900: '#0d0000'
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
                footer: '10em',
                navMobile: '4em'
            },
            colors: {
                currentColorT: 'rgb(currentColor * var(--tw-bg-opacity))',
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
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.own[200]'),
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-lead': theme('colors.own[300]'),
                        '--tw-prose-links': theme('colors.own[300]'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.own[400]'),
                        '--tw-prose-bullets': theme('colors.own[600]'),
                        '--tw-prose-hr': theme('colors.own[700]'),
                        '--tw-prose-quotes': theme('colors.own[200]'),
                        '--tw-prose-quote-borders': theme('colors.own[700]'),
                        '--tw-prose-captions': theme('colors.own[400]'),
                        '--tw-prose-code': theme('colors.own[300]'),
                        '--tw-prose-pre-code': theme('colors.own[300]'),
                        '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
                        '--tw-prose-th-borders': theme('colors.own[600]'),
                        '--tw-prose-td-borders': theme('colors.own[700]'),

                        '--tw-prose-invert-body': theme('colors.own[800]'),
                        '--tw-prose-invert-headings': theme('colors.own[900]'),
                        '--tw-prose-invert-lead': theme('colors.own[700]'),
                        '--tw-prose-invert-links': theme('colors.own[700]'),
                        '--tw-prose-invert-bold': theme('colors.own[900]'),
                        '--tw-prose-invert-counters': theme('colors.own[600]'),
                        '--tw-prose-invert-bullets': theme('colors.own[400]'),
                        '--tw-prose-invert-hr': theme('colors.own[300]'),
                        '--tw-prose-invert-quotes': theme('colors.own[800]'),
                        '--tw-prose-invert-quote-borders': theme('colors.own[300]'),
                        '--tw-prose-invert-captions': theme('colors.own[700]'),
                        '--tw-prose-invert-code': theme('colors.own[900]'),
                        '--tw-prose-invert-pre-code': theme('colors.own[100]'),
                        '--tw-prose-invert-pre-bg': theme('colors.own[900]'),
                        '--tw-prose-invert-th-borders': theme('colors.own[300]'),
                        '--tw-prose-invert-td-borders': theme('colors.own[200]'),
						
						code: {
							backgroundColor: 'var(--tw-prose-pre-bg)',
							padding: '0.125em 0.25em',
							borderRadius: '0.5em'
						},
						'code::before': {
							content: 'none'
						},
						'code::after': {
							content: 'none'
						},
						'blockquote > p': {
							margin: 0,
						},
						blockquote: {
							marginTop: "0.5em",
							marginBottom: "0.5em",
							fontWeight: null,
							fontStyle: null,
						},
						"blockquote p:first-of-type::before": {
							content: null, // Don't apply quotes
						},
						"blockquote p:last-of-type::after": {
							content: null, // Don't apply quotes
						},
						table: {
							overflow: 'auto',
							display: 'block',
						}
                    },
                }
            })
        },
        fontFamily: {
            sans: ['Nunito', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
    darkMode: 'class' // Uncomment to use system defaults
};
