/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Initialize with default values (see options below)
    // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
  ],
}