module.exports = {
    mode: 'jit',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./page-components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          'fade-in': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(-10px)'
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)'
              },
          },
          'fade-out': {
            '0%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
            '100%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
        }
      },
        animation : {
          'fade-in' : 'fade-in ease 1s',
          'fade-out' : 'fade-out ease 1s',
        }
      },
    },
    plugins: [],
  }