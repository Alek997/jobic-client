import React, { useEffect } from 'react'
import { Heading, Center } from '@chakra-ui/react'
import useToaster from 'shared/useToaster'

const Error = () => {
  const toast = useToaster()
  useEffect(() => {
    toast.error()
  }, [])
  return (
    <Center w="100%" my="20">
      <Heading size="xl" color="gray.200">
        An error occurred
      </Heading>
    </Center>
  )
}

export default Error
