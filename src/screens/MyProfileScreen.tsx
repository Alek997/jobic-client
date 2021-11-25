import { Button } from '@chakra-ui/button'
import { Flex, Heading, Box, Center, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useUserInfo } from 'services/userService'
import { routePaths } from 'config/routes'
import { useJob, useMyJobs } from 'services/jobService'
import MyJobItem from '../components/MyJobItem'
import { useHistory } from 'react-router'
import Spinner from 'components/Spinner'
import AvatarImage from 'components/AvatarImage'
import EmptyList from 'components/EmptyList'
import UserBasicInfo from 'components/UserBasicInfo'
import Error from 'components/Error'
import { useMyJobApps } from 'services/jobAppService'
import dayjs from 'dayjs'
import { JobAppDto } from 'types/dto'
import { noop } from 'lodash'
import { applicationStatus } from 'components/JobAppsModal'

const JobAppItem: React.FC<{ jobApp: JobAppDto }> = ({ jobApp }) => {
  const job = useJob(jobApp.jobId)

  if (job.error) return <Error />

  if (job.status === 'loading') return <Spinner />
  return (
    <Flex
      key={jobApp._id}
      w="100%"
      justifyContent="space-between"
      mt="5"
      pb="3"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex direction="column">
        <AvatarImage onClick={noop} src={job.data?.imageUrl} />
        <Text align="left" mt="2">
          {job.data?.name}
        </Text>
      </Flex>
      <Flex direction="column" justify="space-between">
        <Flex direction="row" align="center" alignSelf="center">
          <Flex
            borderRadius="full"
            ml={[1, 3, 5]}
            bgColor={applicationStatus[jobApp?.status].color}
            px="2"
            textAlign="center"
            color="white"
          >
            {applicationStatus[jobApp?.status].message.toUpperCase()}
          </Flex>
        </Flex>

        <Text>{dayjs(jobApp.createdAt).format('DD.MM.YYYY')}</Text>
      </Flex>
    </Flex>
  )
}
const MyJobApps = () => {
  const myJobApps = useMyJobApps()

  if (myJobApps.error) return <Error />

  if (myJobApps.status === 'loading') return <Spinner />

  return (
    <Flex
      alignItems="center"
      w="100%"
      wrap="wrap"
      justify="space-between"
      my="10"
    >
      <Heading
        my="2"
        size="lg"
        w="100%"
        borderBottom="1px"
        borderColor="gray.300"
        pb="2"
      >
        My Applications
      </Heading>
      {myJobApps.data?.length > 0 ? (
        myJobApps.data?.map(jobApp => {
          return <JobAppItem key={jobApp._id} jobApp={jobApp} />
        })
      ) : (
        <EmptyList />
      )}
    </Flex>
  )
}

const MyProfileScreen: React.FC<any> = () => {
  const userInfo = useUserInfo()
  const jobs = useMyJobs()
  const history = useHistory()
  const [onlyActive, setOnlyActive] = useState(false)

  if (userInfo.error || jobs.error) return <Error />

  if (userInfo.status === 'loading' || jobs.status === 'loading')
    return <Spinner />

  const filteredJobs = onlyActive
    ? jobs.data.filter(job => job.status === 'active')
    : jobs.data

  return (
    <Center display="flex" p={['5', '10']} flexDirection="column">
      <Flex
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        flexWrap="wrap"
        w="100%"
      >
        <Box
          flexBasis={'100%'}
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
          <UserBasicInfo {...userInfo.data} />
        </Box>
      </Flex>
      <MyJobApps />
      <Flex
        alignItems="center"
        w="100%"
        wrap="wrap"
        justify="space-between"
        my="10"
      >
        <Flex
          w="100%"
          borderBottom="1px"
          borderColor="gray.300"
          pb="5"
          alignItems="center"
        >
          <Heading size="lg" w="100%">
            My jobs
          </Heading>
        </Flex>
        {filteredJobs?.length > 0 ? (
          <Flex direction="column" w="100%">
            <Button
              onClick={() => setOnlyActive(!onlyActive)}
              color="white"
              size="lg"
              m="0 auto"
              mt="5"
            >
              {onlyActive ? 'Show All' : 'Show Active'}
            </Button>
            <Flex alignItems="center" w="100%" wrap="wrap">
              {filteredJobs?.map(job => (
                <Flex
                  basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
                  alignItems="center"
                  justify="center"
                  key={job._id}
                  marginX={{ base: '0', md: '0.5%', lg: '0.66%', xl: '0.5%' }}
                >
                  <MyJobItem {...job} />
                </Flex>
              ))}
            </Flex>
          </Flex>
        ) : (
          <EmptyList />
        )}
      </Flex>
    </Center>
  )
}

export default MyProfileScreen
