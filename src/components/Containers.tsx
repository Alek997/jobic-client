import React from 'react'
import { Center } from '@chakra-ui/layout'

const JoCenter: React.FC = ({ children }) => {
  return (
    <Center
      position="absolute"
      top="0"
      left="0"
      bottom="0"
      right="0"
      width="100%"
    >
      {children}
    </Center>
  )
}

export default JoCenter
