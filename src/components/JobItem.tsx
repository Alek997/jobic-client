import { useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  // Link,
  Stack,
  Text
} from '@chakra-ui/layout'
import React from 'react'
// import { useEmployer } from 'services/userService'
import { JobDto } from 'types/dto'
import { useDisclosure } from '@chakra-ui/hooks'
import JobDetailsModal from './JobDetailsModal'

interface JobItemProps {
  job: JobDto
  enableModal?: boolean
}

const JobItem: React.FC<JobItemProps> = ({ job, enableModal = true }) => {
  const modal = useDisclosure()

  return (
    <>
      <Center py={12} minH="100%" alignSelf="center" onClick={modal.onOpen}>
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
            mt={-10}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 3,
              left: 0,
              right: 0,
              backgroundImage: `url(${job.imageUrl})`,
              filter: 'blur(30px)',
              zIndex: -1
            }}
            _groupHover={{
              _after: {
                filter: 'blur(35px)'
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
                {/* <Link
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
                </Link> */}
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
            <Flex w="100%" justify="space-between" align="center">
              <Text fontWeight={600} fontSize={'xl'} noOfLines={1}>
                {`${job.budget} RSD`}
              </Text>
              <Heading
                fontSize={'xl'}
                fontFamily={'body'}
                fontWeight={600}
                maxWidth={'32'}
                isTruncated
              >
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
