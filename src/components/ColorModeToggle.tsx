import React from 'react'
import { Flex } from '@chakra-ui/layout'

import { useColorMode, Button, Icon } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ColorModeToggle = props => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex zIndex="2">
      <Button {...props} zIndex="2" onClick={() => toggleColorMode()}>
        {colorMode === 'dark' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
      </Button>
    </Flex>
  )
}

export default ColorModeToggle
