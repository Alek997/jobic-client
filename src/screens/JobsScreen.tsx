import React from 'react'
import { Center, Flex } from '@chakra-ui/layout'
import JobList from 'components/JobList'
import JobsFilter from 'components/JobsFilter'

const JobsScreen: React.FC<any> = () => {
  return (
    <Flex flexDirection="column" alignItems="center" marginY="10" minH="85vh">
      <JobsFilter />
      <Flex
        w="100%"
        mt="40px"
        mb="20px"
        height="3px"
        backgroundColor="teal.300"
      />
      <Center w="90%" alignItems="flex-start" justifyContent="space-between">
        <JobList />
      </Center>
    </Flex>
  )
}

export default JobsScreen
