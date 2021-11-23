import React from 'react'
import { Center, Flex, Heading, Link, Text } from '@chakra-ui/layout'
import { JobDto } from 'types/dto'
import { Button } from '@chakra-ui/button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import {
  acceptJobApp,
  acceptOnlyJobApp,
  denyJobApp,
  useJobApps
} from 'services/jobAppService'
import { queryClient } from 'config/query'
import Spinner from './Spinner'
import { useColorModeValue } from '@chakra-ui/color-mode'
import AvatarImage from './AvatarImage'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { routePaths } from 'config/routes'
import useToaster from 'shared/useToaster'
import Error from './Error'

const applicationStatus = {
  employed: {
    message: 'employed',
    color: 'teal'
  },
  pending: {
    message: 'pending',
    color: 'orange.300'
  },
  not_employed: {
    message: 'denied',
    color: 'red.600'
  }
}

interface Props {
  job: JobDto
}

const JobAppsDetails: React.FC<Props> = ({ job }) => {
  const toast = useToaster()

  const jobApps = useJobApps(job._id)
  const history = useHistory()

  if (jobApps.error) return <Error />
  if (jobApps.status === 'loading') return <Spinner />

  const acceptOnlyOffer = async jobApp => {
    try {
      await acceptOnlyJobApp(jobApp).then(() => {
        queryClient.invalidateQueries(['jobApps', jobApp.jobId])
        toast.success()
      })
    } catch {
      toast.error()
    }
  }
  const acceptOffer = async jobApp => {
    try {
      await acceptJobApp(jobApp).then(() => {
        queryClient.invalidateQueries(['jobApps', jobApp.jobId])
        toast.success()
      })
    } catch {
      toast.error()
    }
  }
  const denyOffer = async jobApp => {
    try {
      await denyJobApp(jobApp).then(() => {
        queryClient.invalidateQueries(['jobApps', jobApp.jobId])
        toast.success()
      })
    } catch {
      toast.error()
    }
  }

  if (jobApps.data?.length === 0) {
    return (
      <Center w="100%" my="20">
        <Heading size="xl" color="gray.200">
          No applications yet
        </Heading>
      </Center>
    )
  }

  return (
    <Flex alignSelf="center" flexDirection="column">
      {jobApps.data?.map(jobApp => {
        return (
          <Flex
            key={jobApp?._id}
            w="90%"
            bgColor={useColorModeValue('gray.50', 'gray.900')}
            borderRadius="lg"
            alignSelf="center"
            direction="column"
            p="2"
            my="2"
          >
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" direction={['column', 'row']}>
                <Link
                  onClick={() =>
                    history.push(
                      routePaths.USER_DETAILS.replace(
                        ':id',
                        jobApp.createdBy._id
                      )
                    )
                  }
                >
                  <AvatarImage
                    src={
                      jobApp?.createdBy.imageUrl
                        ? jobApp?.createdBy.imageUrl
                        : `https://eu.ui-avatars.com/api/?name=${jobApp?.createdBy.firstName}+${jobApp?.createdBy.lastName}`
                    }
                    mb={[2, 0]}
                  />
                </Link>

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
              <Flex direction="column">
                <Popover>
                  <PopoverTrigger>
                    <Button size="md" mb="2">
                      Accept
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Continue hiring?</PopoverHeader>
                    <PopoverBody>
                      <Button
                        size="md"
                        onClick={() => acceptOnlyOffer(jobApp)}
                        mb="2"
                        mr="2"
                      >
                        No
                      </Button>
                      <Button
                        size="md"
                        onClick={() => acceptOffer(jobApp)}
                        mb="2"
                      >
                        Yes
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Button
                  size="md"
                  colorScheme="red"
                  onClick={() => denyOffer(jobApp)}
                >
                  Deny
                </Button>
              </Flex>
            </Flex>
            <Link
              onClick={() =>
                history.push(
                  routePaths.USER_DETAILS.replace(':id', jobApp.createdBy._id)
                )
              }
            >
              <Text mt="2">{`${jobApp?.createdBy.firstName} ${jobApp?.createdBy.lastName}`}</Text>
            </Link>
            <Text mt="2">{jobApp?.message}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

const JobAppsModal: React.FC<any> = ({ job, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Job applications</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <JobAppsDetails job={job} />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default JobAppsModal
