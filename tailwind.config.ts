import type { Config } from "tailwindcss";
import {themeVariants, prefersLight, prefersDark} from "tailwindcss-theme-variants"

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
				dark: '#2A2A2A'
			},
			cPeach: {
				light: '#FF8178',
				DEFAULT: '#ee594e',
				dark: '#f54747'
			},
		}
  	}
  },
  plugins: [require("tailwindcss-animate"),
	require('@tailwindcss/typography'),
	
	themeVariants({
		themes: {
		  light: {
			selector: ".light",
		  },
		  dark: {
			selector: ".dark",
		  },
		},
	  }),
  ],
};
export default config;
