import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import HomeScreenSearch from 'components/HomeScreenSearch'
import OurClients from 'components/Testimonials'
import Statistics from 'components/Statistics'

const HomeScreen: React.FC<any> = () => {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      maxW="100%"
      paddingX={['15px', '50px', '100px']}
      paddingTop={['40px', '50px', '100px']}
    >
      <Flex
        direction="column"
        backgroundColor="teal.100"
        padding="20px"
        borderRadius="xl"
        boxShadow="2xl"
        maxW="3xl"
      >
        <Heading
          textColor="teal.300"
          marginBottom="40px"
          textAlign="left"
          maxW="xl"
          fontSize={['3xl', '5xl']}
        >
          There are millions of opportunities to discover.
        </Heading>
        <Flex>
          <HomeScreenSearch />
        </Flex>
      </Flex>
      <OurClients />

      <Statistics />
    </Flex>
  )
}

export default HomeScreen
