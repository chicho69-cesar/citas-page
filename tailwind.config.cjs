/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        fadeOut: {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        scaleOut: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(0)'
          }
        }
      },
      animation: {
        'bg-fadeIn': 'fadeIn 0.5s ease-in forwards',
        'bg-fadeOut': 'fadeOut 0.5s ease-in forwards',
        'modal-scaleIn': 'scaleIn 0.3s ease-in forwards',
        'modal-scaleOut': 'scaleOut 0.3s ease-in forwards'
      }
    },
  },
  plugins: [],
}