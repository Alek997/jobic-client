import { Button } from '@chakra-ui/button'
import { Flex, Heading, Text, Box, Center } from '@chakra-ui/layout'
import React from 'react'
import { useUserInfo } from 'services/userService'
import { routePaths } from 'config/routes'
import { useMyJobs } from 'services/jobService'
import MyJobItem from '../components/MyJobItem'
import Icon from '@chakra-ui/icon'
import { FaPlus } from 'react-icons/fa'
import { useHistory } from 'react-router'
import Spinner from 'components/Spinner'
import AvatarImage from 'components/AvatarImage'

const MyProfileScreen: React.FC<any> = () => {
  const userInfo = useUserInfo()
  const jobs = useMyJobs()
  const history = useHistory()

  if (userInfo.error || jobs.error) return <div>Error</div>

  if (userInfo.status === 'loading' || jobs.status === 'loading')
    return <Spinner />

  return (
    <Center display="flex" p={['5', '10']} flexDirection="column">
      <Flex
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        flexWrap="wrap"
        w="100%"
      >
        <Box
          flexBasis={['100%', '65%']}
          textAlign="left"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="lg"
          p="10"
          mt="10"
        >
          <Flex alignItems="center" w="100%" justifyContent="space-between">
            <Heading size="md">Basic info</Heading>
            <Button
              onClick={() => history.push(routePaths.EDIT_MY_PROFILE)}
              color="white"
              size="lg"
            >
              Edit
            </Button>
          </Flex>
          <AvatarImage />
          <Text>{userInfo.data?.firstName}</Text>
          <Text>{userInfo.data?.lastName}</Text>
          <Text>{userInfo.data?.email}</Text>
          <Text>{userInfo.data?.phone}</Text>
        </Box>
        <Box
          flexBasis={['100%', '30%']}
          textAlign="left"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="lg"
          p="10"
          mt="10"
        >
          <Center flexDirection="column" h="100%">
            <Heading size="sm">Create new job</Heading>
            <Button
              onClick={() => history.push(routePaths.CREATE_JOB)}
              alignSelf="left"
              color="white"
              size="sm"
            >
              <Icon as={FaPlus} />
            </Button>
          </Center>
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        w="100%"
        wrap="wrap"
        justify="space-between"
        my="10"
      >
        <Heading
          size="lg"
          w="100%"
          borderBottom="1px"
          borderColor="gray.300"
          pb="5"
        >
          My jobs
        </Heading>
        {jobs.data?.map(job => (
          <Flex
            basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
            alignItems={'center'}
            justify="center"
            key={job._id}
          >
            <MyJobItem {...job} />
          </Flex>
        ))}
      </Flex>
    </Center>
  )
}

export default MyProfileScreen
