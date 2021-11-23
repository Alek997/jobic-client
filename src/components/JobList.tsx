import React from 'react'
import { Flex, Link } from '@chakra-ui/layout'
import JobItem from './JobItem'
import { useInfiniteJobsQuery } from 'services/jobService'
import useSearchParams from 'shared/useSearchParams'
import Spinner from './Spinner'
import EmptyList from './EmptyList'
import Error from './Error'

const JobList: React.FC = () => {
  const params = useSearchParams()
  const query = useInfiniteJobsQuery(params)

  if (query.error) return <Error />

  if (query.status === 'loading') return <Spinner />

  if (query.data.pages[0].content.length === 0) {
    return <EmptyList />
  }

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Flex alignItems="center" width="100%" wrap="wrap">
        {query.data?.pages.map(page =>
          page.content.map(job => (
            <Flex
              minH="200px"
              basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
              marginX={{ base: '0', md: '0.5%', lg: '0.66%', xl: '0.5%' }}
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
