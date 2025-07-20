import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // South African Flag Colors - QueueCare Theme
        'sa-green': {
          DEFAULT: '#00A651',
          50: '#E6F7ED',
          100: '#CCEFDB',
          500: '#00A651',
          600: '#008A44',
          700: '#006D37',
          900: '#003A1E',
        },
        'sa-gold': {
          DEFAULT: '#FFB81C',
          50: '#FFF7E6',
          100: '#FFEFCC',
          500: '#FFB81C',
          600: '#E6A519',
          700: '#CC9116',
          900: '#804D0E',
        },
        'sa-blue': {
          DEFAULT: '#002395',
          50: '#E6E6F2',
          100: '#CCCCF5',
          500: '#002395',
          600: '#001F81',
          700: '#001A6E',
          900: '#00103D',
        },
        'sa-red': {
          DEFAULT: '#DE3831',
          50: '#FBE9E8',
          100: '#F7D3D1',
          500: '#DE3831',
          600: '#C8322B',
          700: '#B12C25',
          900: '#621815',
        },
        // Updated primary colors using SA palette
        primary: {
          DEFAULT: '#00A651',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFB81C',
          foreground: '#000000',
        },
        // Keep existing colors for compatibility
        green: {
          500: "#00A651",
          600: "#008A44",
        },
        blue: {
          500: "#002395",
          600: "#001F81",
        },
        red: {
          500: "#DE3831",
          600: "#C8322B",
          700: "#B12C25",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
        light: {
          200: "#E8E9E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;