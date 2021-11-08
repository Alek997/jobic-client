import {
  extendTheme,
  withDefaultColorScheme,
  ThemeConfig
} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: '27em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '90em'
})

const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'teal' }),
  config,
  breakpoints
)

export default theme
