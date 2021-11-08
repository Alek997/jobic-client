import React from 'react'
import { Button } from '@chakra-ui/button'
import { routePaths } from 'config/routes'
import { NavLink } from 'react-router-dom'
import { Center, Flex, Heading } from '@chakra-ui/layout'
import { logout } from 'services/auth'
import { Icon, Image, useMediaQuery } from '@chakra-ui/react'
import { FaSignOutAlt, FaPlus } from 'react-icons/fa'
import ColorModeToggle from './ColorModeToggle'
import { useHistory } from 'react-router'
import Logo from 'assets/logo.svg'
import AvatarImage from './AvatarImage'

const NavBar: React.FC<any> = () => {
  const history = useHistory()
  const [isLargeScreen] = useMediaQuery('(min-width: 768px)')

  return (
    <Flex
      paddingX={[5, 20]}
      paddingY="5"
      justify="space-between"
      boxShadow="lg"
      flexDirection={['column', 'row']}
    >
      <NavLink to={routePaths.HOME}>
        <Center>
          <Image src={Logo} alt="Logo" h="40px" />

          <Heading size="lg" textColor="teal.300">
            Jobic
          </Heading>
        </Center>
      </NavLink>

      <Flex mt={[7, 0]} justify="space-between">
        <Flex>
          <Button mr="3" onClick={() => history.push(routePaths.CREATE_JOB)}>
            {isLargeScreen ? (
              <Heading size="md">Add new job</Heading>
            ) : (
              <Icon as={FaPlus} />
            )}
          </Button>
          <AvatarImage
            mr="3"
            h="40px"
            w="40px"
            onClick={() => history.push(routePaths.MY_PROFILE)}
          />
          <Button mr="3" onClick={logout}>
            <Icon as={FaSignOutAlt} />
          </Button>
        </Flex>
        <ColorModeToggle />
      </Flex>
    </Flex>
  )
}

export default NavBar
