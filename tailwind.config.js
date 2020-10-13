const { theme: { colors } } = require('tailwindcss/defaultConfig')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: {
          ...colors.teal,
          150: '#dbfff9',
          200: '#d7fbf4'
        }
      },
      height: theme => ({
        ...theme('spacing'),
        '2/3vh': '67vh'
      }),
      minHeight: theme => ({
        ...theme('spacing')
      }),
      maxHeight: theme => ({
        ...theme('spacing')
      }),
      minWidth: theme => ({
        ...theme('spacing')
      }),
      maxWidth: theme => ({
        ...theme('spacing')
      }),
      spacing: {
        36: '9rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '100vw': '100vw',
        content: 'calc(100vh - 3rem)'
      },
      boxShadow: {
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -1px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  variants: {},
  plugins: [],
}
