import React from 'react'
import { Flex, Heading, Text, Stack, Link } from '@chakra-ui/layout'
import { UserInfoDto } from 'types/dto'
import Icon from '@chakra-ui/icon'
import { FaEnvelope, FaPhone, FaStar } from 'react-icons/fa'

const UserBasicInfo: React.FC<UserInfoDto> = ({
  firstName,
  lastName,
  email,
  phone,
  avgRating,
  summary
}) => {
  return (
    <>
      <Flex w="100%" wrap="wrap" justifyContent="space-between">
        <Stack mt="5" basis={{ base: '100%', md: '49%', lg: '32%' }}>
          <Heading size="sm">User name</Heading>
          <Text>{`${firstName} ${lastName}`}</Text>
        </Stack>
        <Stack mt="5">
          <Heading size="sm">Contact</Heading>
          <Link href={`mailto:${email}`}>
            <Flex align="center">
              <Icon as={FaEnvelope} mr="5" />
              <Text>{email}</Text>
            </Flex>
          </Link>
          <Link href={`tel:${phone}`}>
            <Flex align="center">
              <Icon as={FaPhone} mr="5" />
              <Text>{phone}</Text>
            </Flex>
          </Link>
        </Stack>
        <Stack mt="5">
          <Heading size="sm">Rating</Heading>
          {avgRating ? (
            <Flex align="center">
              <Text mr="2">{`${avgRating.toFixed(1)}/5`}</Text>
              <Icon as={FaStar} />
            </Flex>
          ) : (
            <Text color="gray.400">No rating</Text>
          )}
        </Stack>
      </Flex>
      <Stack mt="5">
        <Heading size="sm">Summary</Heading>
        {summary ? (
          <Text>{summary}</Text>
        ) : (
          <Text color="gray.400">No summary</Text>
        )}
      </Stack>
    </>
  )
}

export default UserBasicInfo
