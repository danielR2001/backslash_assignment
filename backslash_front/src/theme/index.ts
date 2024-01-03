import { createTheme } from '@mui/material'

import palette from './palette'
import typography from './typography'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    desktop: true
  }
}

export const theme = createTheme({
  spacing: 8,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1024
    }
  },
  palette,
  typography,
  components: {}
})
