import { Flex, Heading, Text } from '@chakra-ui/layout'
import React from 'react'
import { useJob } from 'services/jobService'
import Spinner from 'components/Spinner'
import AvatarImage from 'components/AvatarImage'
import EmptyList from 'components/EmptyList'
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
      borderBottom="1px"
      borderColor="gray.200"
      mt="5"
      pb="3"
      px="10"
      direction="column"
      align="flex-start"
    >
      <Flex key={jobApp._id} w="100%" justifyContent="space-between">
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
      <Text maxW="100%" textAlign="left" color="gray.500">
        {jobApp.message}
      </Text>
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

export default MyJobApps
