/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMdode: 'class',
  plugins: [nextui()]
}
