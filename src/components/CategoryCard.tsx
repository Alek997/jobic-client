import { Center, Image, Text } from '@chakra-ui/react'
import React from 'react'

const CategoryCard = () => (
  <Center flexDirection="column" width="300px">
    <Image
      borderRadius="full"
      boxSize="150px"
      src="https://bit.ly/sage-adebayo"
      alt="Segun Adebayo"
    />
    <Text fontSize="md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl
      faucibus, accumsan leo ornare, cursus quam. Aliquam eu erat bibendum,
      molestie est et, gravida turpis.
    </Text>
  </Center>
)

export default CategoryCard
