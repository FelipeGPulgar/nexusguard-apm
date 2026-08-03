import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0B0F19",
          card: "#111827",
          border: "#1F2937",
          accent: "#10B981",
          danger: "#EF4444",
          warning: "#F59E0B",
          neon: "#06B6D4"
        }
      }
    },
  },
  plugins: [],
};
export default config;
