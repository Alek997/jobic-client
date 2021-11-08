import React from 'react'
import { Flex, Link } from '@chakra-ui/layout'
import JobItem from './JobItem'
import { useInfiniteJobsQuery } from 'services/jobService'
import useSearchParams from 'shared/useSearchParams'
import Spinner from './Spinner'

const JobList: React.FC = () => {
  const params = useSearchParams()
  const query = useInfiniteJobsQuery(params)

  if (query.error) return <div>Error</div>

  if (query.status === 'loading') return <Spinner />

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Flex
        alignItems="center"
        width="100%"
        wrap="wrap"
        justify="space-between"
      >
        {query.data?.pages.map(page =>
          page.content.map(job => (
            <Flex
              basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
              alignItems={'center'}
              justify="center"
              key={job._id}
            >
              <JobItem job={job} />
            </Flex>
          ))
        )}
      </Flex>
      {query.isFetching && <Spinner />}
      {query.hasNextPage && (
        <Link w="100%" onClick={() => query.fetchNextPage()}>
          See more
        </Link>
      )}
    </Flex>
  )
}

export default JobList
