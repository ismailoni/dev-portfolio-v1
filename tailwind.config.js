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
			primary: '#1c1c22',
			accent: {
				DEFAULT: '#13cf71'
			},
			background: '#1c1c22',
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
