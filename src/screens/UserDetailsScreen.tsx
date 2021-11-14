import React from 'react'
import { Flex, Heading, Text, Box, Center } from '@chakra-ui/layout'
import { useEmployer, useUserInfo } from 'services/userService'
import Spinner from 'components/Spinner'
import { useParams } from 'react-router-dom'
import JobItem from 'components/JobItem'
import { useEmployerReviews } from 'services/reviewService'
import { useEmployerJobs } from 'services/jobService'
import dayjs from 'dayjs'
import AvatarImage from 'components/AvatarImage'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import RateUserModal from 'components/RateUserModal'
import { useHistory } from 'react-router'
import { routePaths } from 'config/routes'

const UserDetailsScreen: React.FC<any> = () => {
  const { id } = useParams()
  const localUser = useUserInfo()
  const userInfo = useEmployer(id)
  const reviews = useEmployerReviews(id)
  const jobs = useEmployerJobs(id)
  const modal = useDisclosure()
  const history = useHistory()

  if (userInfo.error || jobs.error || reviews.error) return <div>Error</div>

  if (
    userInfo.status === 'loading' ||
    jobs.status === 'loading' ||
    reviews.status === 'loading'
  )
    return <Spinner />

  const canRate = !reviews.data.find(
    review => review.createdBy._id === localUser.data?._id
  )

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
            <AvatarImage
              src={
                userInfo.data?.imageUrl
                  ? userInfo.data?.imageUrl
                  : `https://eu.ui-avatars.com/api/?name=${userInfo.data?.firstName}+${userInfo.data?.lastName}`
              }
            />
          </Flex>

          <Text>{userInfo.data?.firstName}</Text>
          <Text>{userInfo.data?.lastName}</Text>
          <Text>{userInfo.data?.email}</Text>
          <Text>{userInfo.data?.phone}</Text>
          {userInfo.data?.avgRating && (
            <Text>{`${userInfo.data?.avgRating}/5`}</Text>
          )}
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
          User jobs
        </Heading>
        {jobs.data?.map(job => (
          <Flex
            basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
            alignItems={'center'}
            justify="center"
            key={job._id}
          >
            <JobItem job={job} />
          </Flex>
        ))}
      </Flex>

      <Flex
        alignItems="center"
        w="100%"
        wrap="wrap"
        justify="space-between"
        my="10"
      >
        {canRate && (
          <Button m="0 auto" onClick={modal.onOpen}>
            Rate user
          </Button>
        )}
        <Heading
          my="2"
          size="lg"
          w="100%"
          borderBottom="1px"
          borderColor="gray.300"
          pb="2"
        >
          User reviews
        </Heading>
        <RateUserModal employer={userInfo.data} {...modal} />
        {reviews.data?.map(review => {
          return (
            <Flex key={review._id} w="100%" justifyContent="space-between">
              <AvatarImage
                onClick={() =>
                  history.push(
                    routePaths.USER_DETAILS.replace(':id', review.createdBy._id)
                  )
                }
                src={
                  review.createdBy.imageUrl
                    ? review.createdBy.imageUrl
                    : `https://eu.ui-avatars.com/api/?name=${review.createdBy.firstName}+${review.createdBy.lastName}`
                }
              />
              <Text>{review.description}</Text>
              <Text>{`${review.rating}/5`}</Text>
              <Text>{dayjs(review.createdAt).format('DD.MM.YYYY')}</Text>
            </Flex>
          )
        })}
      </Flex>
    </Center>
  )
}

export default UserDetailsScreen
