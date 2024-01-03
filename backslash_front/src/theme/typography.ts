import createTypography from '@mui/material/styles/createTypography'

import palette from './palette'

function pxToRem(value: number) {
  return `${value / 16}rem`
}

function responsiveFontSizes({ mobile, tablet, desktop }: { mobile: number; tablet: number; desktop: number }) {
  return {
    '@media (max-width:768px)': {
      fontSize: pxToRem(mobile)
    },
    '@media (min-width:768px)': {
      fontSize: pxToRem(tablet)
    },
    '@media (min-width:1024px)': {
      fontSize: pxToRem(desktop)
    }
  }
}

const FONT_PRIMARY = 'Barlow, Rubik, sans-serif'

declare module '@mui/material/styles/createTypography' {
  interface CustomTypography {}

  interface Typography extends CustomTypography {}
  interface TypographyOptions extends CustomTypography {}
}

const createMyTypography = createTypography(palette, {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    fontSize: pxToRem(96),
    ...responsiveFontSizes({ mobile: 72, tablet: 72, desktop: 96 }),
    lineHeight: 'normal'
  },
  h2: {
    fontWeight: 700,
    fontSize: pxToRem(60),
    ...responsiveFontSizes({ mobile: 46, tablet: 46, desktop: 60 }),
    lineHeight: 'normal'
  },
  h3: {
    fontWeight: 700,
    fontSize: pxToRem(48),
    ...responsiveFontSizes({ mobile: 36, tablet: 36, desktop: 48 }),
    lineHeight: 'normal'
  },
  h4: {
    fontWeight: 700,
    fontSize: pxToRem(34),
    ...responsiveFontSizes({ mobile: 28, tablet: 28, desktop: 34 }),
    lineHeight: 'normal'
  },
  h5: {
    fontWeight: 'normal',
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ mobile: 22, tablet: 22, desktop: 24 }),
    lineHeight: 'normal'
  },
  h6: {
    fontWeight: 700,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ mobile: 18, tablet: 18, desktop: 20 }),
    lineHeight: 'normal'
  },
  subtitle1: {
    fontSize: pxToRem(16),
    fontWeight: 700,
    ...responsiveFontSizes({ mobile: 16, tablet: 16, desktop: 16 }),
    lineHeight: 'normal'
  },
  subtitle2: {
    fontSize: pxToRem(14),
    fontWeight: 700,
    ...responsiveFontSizes({ mobile: 14, tablet: 14, desktop: 14 }),
    lineHeight: 'normal'
  },
  body1: {
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ mobile: 16, tablet: 16, desktop: 16 }),
    lineHeight: 'normal'
  },
  body2: {
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ mobile: 14, tablet: 14, desktop: 14 }),
    lineHeight: 'normal'
  },
  caption: {
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ mobile: 12, tablet: 12, desktop: 12 }),
    lineHeight: 'normal'
  },
  button: {
    fontWeight: 700,
    fontSize: pxToRem(14),
    textTransform: 'uppercase',
    ...responsiveFontSizes({ mobile: 14, tablet: 14, desktop: 14 }),
    lineHeight: 'normal'
  },
  overline: {
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ mobile: 10, tablet: 10, desktop: 10 }),
    lineHeight: 'normal'
  }
})

export default createMyTypography
