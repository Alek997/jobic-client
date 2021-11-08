import React from 'react'
import { Flex } from '@chakra-ui/layout'
import Logo from 'assets/logo.svg'
import { Image } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { routePaths } from 'config/routes'
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2} alignSelf="center">
      {children}
    </Text>
  )
}

const Footer: React.FC<any> = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={8}
          display="flex"
          justifyContent="space-evenly"
        >
          <Stack align={'flex-start'}>
            <ListHeader>For Job seekers</ListHeader>
            <Link as={NavLink} to={routePaths.JOBS}>
              Browse Jobs
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>For Employers</ListHeader>
            <Link as={NavLink} to={routePaths.CREATE_JOB}>
              Post a Job
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link as={NavLink} to={routePaths.PRIVACY_POLICY}>
              Privacy Policy
            </Link>
            <Link as={NavLink} to={routePaths.TERMS_OF_USE}>
              Terms of Use
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8
          }}
        >
          <Image src={Logo} alt="Logo" h="40px" />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2021 JOBIC. All rights reserved
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
