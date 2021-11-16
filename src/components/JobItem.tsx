import { useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text
} from '@chakra-ui/layout'
import React from 'react'
import { useEmployer } from 'services/userService'
import { JobDto } from 'types/dto'
import { useDisclosure } from '@chakra-ui/hooks'
import JobDetailsModal from './JobDetailsModal'
import { useHistory } from 'react-router'
import { routePaths } from 'config/routes'

interface JobItemProps {
  job: JobDto
  enableModal?: boolean
}

const JobItem: React.FC<JobItemProps> = ({ job, enableModal = true }) => {
  const employer = useEmployer(job.createdBy)
  const modal = useDisclosure()
  const history = useHistory()

  return (
    <>
      <Center py={12} alignSelf="center" onClick={modal.onOpen}>
        <Box
          role={'group'}
          p={6}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${job.imageUrl})`,
              filter: 'blur(15px)',
              zIndex: -1
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)'
              }
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={job.imageUrl}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Flex w={'100%'} justify={'space-between'}>
              <Flex direction="column" textAlign="left">
                <Link
                  onClick={() =>
                    history.push(
                      routePaths.USER_DETAILS.replace(':id', employer.data?._id)
                    )
                  }
                  color={'gray.500'}
                  fontSize={'sm'}
                  textTransform={'uppercase'}
                >
                  {`${employer.data?.firstName} ${employer.data?.lastName}`}
                </Link>
                <Text color={'gray.500'}>{job.city}</Text>
              </Flex>

              <Badge
                m="auto 0"
                borderRadius="full"
                px="2"
                colorScheme={job.status === 'active' ? 'teal' : 'gray'}
              >
                {job.status.toUpperCase()}
              </Badge>
            </Flex>
            <Flex w="100%" justify="space-between">
              <Text fontWeight={600} fontSize={'xl'}>
                {`${job.budget} RSD`}
              </Text>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {job.name}
              </Heading>
            </Flex>
          </Stack>
        </Box>
      </Center>
      {enableModal && <JobDetailsModal job={job} {...modal} />}
    </>
  )
}

export default JobItem
