/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cream': {
          50: '#fefdf8',
          100: '#fdf9e7',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce': 'bounce 1s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      perspective: {
        '1000': '1000px',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
};
