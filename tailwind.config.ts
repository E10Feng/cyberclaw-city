import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          cyan: '#00f0ff',
          purple: '#7c3aed',
          blue: '#1d4ed8',
          pink: '#f472b6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
