import React from 'react'
import { Flex, Text } from '@chakra-ui/layout'
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
import { acceptJobApp, denyJobApp, useJobApps } from 'services/jobAppService'
import { queryClient } from 'config/query'
import Spinner from './Spinner'
import { useToast } from '@chakra-ui/toast'
import { useColorModeValue } from '@chakra-ui/color-mode'
import AvatarImage from './AvatarImage'

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
  const toast = useToast()
  const jobApps = useJobApps(job._id)

  if (jobApps.error) return <div>Error</div>
  if (jobApps.status === 'loading') return <Spinner />

  const acceptOffer = async jobApp => {
    try {
      await acceptJobApp(jobApp).then(() => {
        queryClient.invalidateQueries(['jobApps', jobApp.jobId])
        toast({
          title: 'Successful',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      })
    } catch {
      toast({
        title: 'Error',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }
  const denyOffer = async jobApp => {
    try {
      await denyJobApp(jobApp).then(() => {
        queryClient.invalidateQueries(['jobApps', jobApp.jobId])
        toast({
          title: 'Successful',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      })
    } catch {
      toast({
        title: 'Error',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
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
          >
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" direction={['column', 'row']}>
                <AvatarImage
                  src={
                    jobApp?.createdBy.imageUrl
                      ? jobApp?.createdBy.imageUrl
                      : `https://eu.ui-avatars.com/api/?name=${jobApp?.createdBy.firstName}+${jobApp?.createdBy.lastName}`
                  }
                  mb={[2, 0]}
                />

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
                <Button size="md" onClick={() => acceptOffer(jobApp)} mb="2">
                  Accept
                </Button>
                <Button
                  size="md"
                  colorScheme="red"
                  onClick={() => denyOffer(jobApp)}
                >
                  Deny
                </Button>
              </Flex>
            </Flex>
            <Text mt="2">{`${jobApp?.createdBy.firstName} ${jobApp?.createdBy.lastName}`}</Text>
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
