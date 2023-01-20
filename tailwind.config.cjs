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
			fontSize: {
				h1: ['32px', { lineHeight: '36px' }],
				h2: ['24px', { lineHeight: '28px' }],
				h3: ['20px', { lineHeight: '24px' }],
				h4: ['18px', { lineHeight: '22px' }],
				body: ['16px', { lineHeight: '20px' }],
				tag: ['14px', { lineHeight: '16px' }],
			},
			fontWeight: {},
			colors: {
				primary: {
					dark2: colors.indigo[900],
					dark1: colors.blue[800],
					normal: colors.blue[700],
					bright1: colors.blue[400],
					bright2: colors.blue[100],
				},
				secondary: {
					dark: colors.violet[700],
					normal: colors.violet[500],
					bright: colors.violet[300],
				},
				accent: {
					dark: colors.emerald[600],
					normal: colors.emerald[400],
					bright: colors.emerald[200],
				},
			},
		},
	},
	plugins: [],
};
