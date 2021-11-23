import React from 'react'
import { Heading, Center } from '@chakra-ui/react'

const EmptyList = ({ label = 'Sorry, list is empty' }: { label?: string }) => (
  <Center w="100%" my="20">
    <Heading size="xl" color="gray.200">
      {label}
    </Heading>
  </Center>
)

export default EmptyList
