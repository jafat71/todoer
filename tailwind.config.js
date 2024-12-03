/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			"voidBlack":"#101010",
			"fgreen":"#39FF14",
			"f2green":"#89F336",
			"fblue":"#2323FF"
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
