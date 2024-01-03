import { styled } from '@mui/material'

export const StyledCompWithProps = styled('div', { shouldForwardProp: (prop) => prop !== 'color' })<{
  color?: 'primary' | 'secondary'
}>(({ theme, color }) => ({}))

export const StyledComp = styled('div')(({ theme }) => ({}))
