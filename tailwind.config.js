/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                voidBlack: '#0A0A0A',
                f2green: '#00FF00',
                fgreen: '#39FF14',
                fblue: '#2323FF'
            },
            keyframes: {
                radar: {
                    '0%': { transform: 'scale(0.8)', opacity: '1' },
                    '100%': { transform: 'scale(1.2)', opacity: '0' }
                }
            },
            animation: {
                'radar': 'radar 2s ease-in-out infinite'
            }
        }
    },
    plugins: [animate],
}
