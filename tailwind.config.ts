import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			cBlack: {
				light: '#1C1C1C',
				DEFAULT: '#1C1C1C',
				dark: '#1C1C1C'
			},
			cGray: {
				light: '#d1d5db',
				DEFAULT: '#374151',
				dark: '#1f2937'
			},
			cPeach: {
				light: '#FF8178',
				DEFAULT: '#FF8178',
				dark: '#FF8178'
			},
		}
  	}
  },
  plugins: [require("tailwindcss-animate"),
	require('@tailwindcss/typography')
  ],
};
export default config;
