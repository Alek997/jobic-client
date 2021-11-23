import React from 'react'
import { Spinner as BaseSpinner, Center } from '@chakra-ui/react'

const Spinner = () => {
  return (
    <Center w="100%">
      <BaseSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        m="20"
        size="xl"
      />
    </Center>
  )
}

export default Spinner
