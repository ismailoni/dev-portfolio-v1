/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		center: true,
		padding: '15px',
	},
	screens: {
		sm: "640px",
		md: "768px",
		lg: "960px",
		xl: "1200px",
	},
	fontFamily: {
		primary: 'var(--font-jebrains_Mono)'
	},
	extend: {
		colors: {
				primary: '#0e1221',
			accent: {
					DEFAULT: '#13cf71',
					hover: '#0fbf67'
			},
				background: '#090d18',
				surface: '#141b2f',
			foreground: 'var(--foreground)'
		},
		borderRadius: {
			lg: '6px',
			md: '4px',
			sm: '2px'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};
