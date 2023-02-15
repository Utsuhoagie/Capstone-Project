/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			// london: ['London'],
			notoSans: ['Noto Sans'],
		},
		extend: {
			spacing: {
				'w-button-small': 100,
				'w-button-medium': 140,
				'w-button-big': 180,
				'w-input-medium': 300,
				'w-navbar': 240,
				'h-input': 40,
				'h-dialog-title': 40,
			},
			fontSize: {
				h1: ['32px', { lineHeight: '36px' }],
				h2: ['24px', { lineHeight: '28px' }],
				h3: ['20px', { lineHeight: '24px' }],
				h4: ['18px', { lineHeight: '22px' }],
				body: ['16px', { lineHeight: '20px' }],
				tag: ['13px', { lineHeight: '13px' }],
			},
			colors: {
				primary: {
					dark: {
						2: colors.indigo[900],
						1: colors.blue[800],
					},
					normal: colors.blue[700],
					bright: {
						1: '#4657e5',
						2: colors.blue[500],
						3: colors.blue[400],
						4: colors.blue[300],
						5: colors.blue[200],
						6: colors.blue[100],
						7: colors.blue[50],
					},
				},
				secondary: {
					dark: {
						3: '#3f1a99',
						2: colors.violet[800],
						1: colors.indigo[600],
					},
					normal: colors.indigo[400],
					bright: {
						1: colors.indigo[300],
						2: colors.indigo[200],
						3: colors.indigo[100],
					},
				},
				accent: {
					dark: colors.emerald[600],
					normal: colors.emerald[400],
					bright: {
						1: colors.emerald[300],
						2: colors.emerald[200],
					},
				},
				neutral: {
					black: '#000000',
					gray: {
						9: colors.gray[900],
						8: colors.gray[700],
						7: colors.gray[600],
						6: colors.gray[500],
						5: colors.gray[400],
						4: colors.gray[300],
						3: colors.gray[200],
						2: colors.gray[100],
						1: colors.gray[50],
					},
					white: '#ffffff',
				},
				state: {
					success: colors.green[500],
					warning: colors.yellow[400],
					error: colors.red[600],
				},
			},
		},
	},
	plugins: [require('@headlessui/tailwindcss')],
};
