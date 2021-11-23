import React from 'react'
import { JobDto } from 'types/dto'
import JobItem from 'components/JobItem'
import { useDisclosure, Box } from '@chakra-ui/react'
import { useJobApps } from 'services/jobAppService'
import Spinner from './Spinner'
import JobAppsModal from './JobAppsModal'
import Error from './Error'

const MyJobItem = (job: JobDto) => {
  const modal = useDisclosure()

  const jobApps = useJobApps(job._id)

  if (jobApps.error) return <Error />

  if (jobApps.status === 'loading') return <Spinner />

  return (
    <>
      <Box onClick={modal.onOpen}>
        <JobItem key={job._id} job={job} enableModal={false} />
      </Box>
      <JobAppsModal job={job} {...modal} />
    </>
  )
}

export default MyJobItem
