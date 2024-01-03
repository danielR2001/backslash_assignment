import createPalette, { PaletteOptions } from '@mui/material/styles/createPalette'

const lightThemeOptions: PaletteOptions = {
  mode: 'light'
}

const createMyPalette = createPalette(lightThemeOptions)

export default createMyPalette
