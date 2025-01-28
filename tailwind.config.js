/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
	theme: {
	  extend: {
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  chart: {
			"1": "#00FF00",
			"2": "#00CC00",
			"3": "#009900",
			"4": "#006600",
			"5": "#003300",
		  },
		  sidebar: {
			DEFAULT: "#1A1A1A",
			foreground: "#FFFFFF",
			primary: "#00FF00",
			"primary-foreground": "#000000",
			accent: "#2E2E2E",
			"accent-foreground": "#FFFFFF",
			border: "#2E2E2E",
			ring: "#00FF00",
		  },
		  sidebarItem: "#1E1E1E",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
  