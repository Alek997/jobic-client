import React from 'react'
import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { JobDto } from 'types/dto'
import { Image } from '@chakra-ui/image'
import { useEmployer, useUserInfo } from 'services/userService'
import { routePaths } from 'config/routes'
import { Button } from '@chakra-ui/button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/modal'
import { useHistory } from 'react-router'

interface Props {
  job: JobDto
}

const JobDetails: React.FC<Props> = ({ job }) => {
  const employer = useEmployer(job.createdBy)

  return (
    <Flex alignSelf="center" flexDirection="column">
      <Flex
        alignItems="center"
        borderBottom="1px"
        marginY="10"
        borderColor="gray.300"
        direction={['column', 'row']}
      >
        <Box w={['100%', '30%']} mr={['0', '10']} mb="2">
          <Image src={job.imageUrl} alt={job.name} borderRadius="lg" />
        </Box>
        <Flex justifyContent="space-between">
          <Box textAlign="left">
            <Heading size="lg" lineHeight="10">
              {job.name}
            </Heading>
            <Heading
              color="gray.600"
              size="md"
              lineHeight="10"
            >{`${employer.data?.firstName} - ${employer.data?.lastName}`}</Heading>
            <Heading
              color="gray.400"
              size="md"
              lineHeight="10"
            >{`${job.city} - ${job.address}`}</Heading>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <Flex>
          <Heading color="gray.400" size="md" lineHeight="10" marginRight="5">
            Cena:
          </Heading>
          <Heading color="gray.600" size="md" lineHeight="10">
            {`${job.budget} RSD`}
          </Heading>
        </Flex>
        <Flex textAlign="center" alignSelf="center">
          <Heading color="gray.400" size="md" marginRight="5" py="1">
            Status:
          </Heading>
          <Badge borderRadius="full" p="2" colorScheme="teal">
            {job?.status.toUpperCase()}
          </Badge>
        </Flex>
      </Box>
      <Box mt="10">
        <Text color="gray.600" textAlign="left">
          {job.description}
        </Text>
      </Box>
    </Flex>
  )
}

const JobDetailsModal: React.FC<any> = ({ job, isOpen, onClose }) => {
  const history = useHistory()
  const userInfo = useUserInfo()
  const isOwner = userInfo.data?._id == job.createdBy
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <JobDetails job={job} />
        </ModalBody>
        <ModalFooter>
          {isOwner ? (
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() =>
                history.push(routePaths.EDIT_JOB.replace(':id', job._id))
              }
            >
              Edit
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() =>
                history.push(routePaths.APPLY_JOB.replace(':id', job._id))
              }
            >
              Apply
            </Button>
          )}

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default JobDetailsModal
