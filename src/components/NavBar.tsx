import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { routePaths } from 'config/routes'
import { NavLink } from 'react-router-dom'
import { Center, Flex, Heading, Link, Text } from '@chakra-ui/layout'
import { logout } from 'services/auth'
import { Icon, Image, useMediaQuery } from '@chakra-ui/react'
import { FaSignOutAlt, FaPlus, FaBell } from 'react-icons/fa'
import ColorModeToggle from './ColorModeToggle'
import { useHistory } from 'react-router'
import Logo from 'assets/logo.svg'
import AvatarImage from './AvatarImage'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu'
import { fetchNotifications } from 'services/notificationService'
import { slice } from 'lodash'
import { useDisclosure, useInterval } from '@chakra-ui/hooks'
import NotificationModal from './NotificationModal'
import { NotificationDto } from 'types/dto'

export const NotificationMenuItem = ({
  notification
}: {
  notification: NotificationDto
}) => {
  const modal = useDisclosure()

  return (
    <>
      <MenuItem
        onClick={modal.onOpen}
        bgColor={notification.status === 'active' ? 'white' : 'gray.200'}
      >
        {slice(`${notification.title} - ${notification.description}`, 0, 25)}
      </MenuItem>
      <NotificationModal notification={notification} {...modal} />
    </>
  )
}

const NavBar: React.FC<any> = () => {
  const history = useHistory()
  const [isLargeScreen] = useMediaQuery('(min-width: 768px)')
  const [notifications, setNotifications] = useState<NotificationDto[]>([])
  const [activeNotifications, setActiveNotifications] = useState<
    NotificationDto[]
  >([])

  useEffect(() => {
    fetchNotifications().then(res => setNotifications(res))
  }, [])

  useEffect(() => {
    if (notifications) {
      const active = notifications.filter(
        notification => notification.status === 'active'
      )
      setActiveNotifications(active)
    }
  }, [notifications])

  useInterval(async () => {
    const data = await fetchNotifications()
    setNotifications(data)
  }, 5 * 60 * 1000)

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
          <Link onClick={() => history.push(routePaths.MY_PROFILE)}>
            <AvatarImage mr="3" h="40px" w="40px" />
          </Link>
          <Menu closeOnBlur closeOnSelect>
            <MenuButton
              mr="3"
              as={Button}
              position="relative"
              onClick={() => setActiveNotifications([])}
            >
              <Icon as={FaBell} />
              {activeNotifications.length > 0 && (
                <Text position="absolute" top="5px" right="5px">
                  {activeNotifications.length}
                </Text>
              )}
            </MenuButton>
            <MenuList>
              {notifications.map(notification => (
                <NotificationMenuItem
                  key={notification._id}
                  notification={notification}
                />
              ))}
              {notifications.length <= 0 && (
                <MenuItem disabled>No notifications</MenuItem>
              )}
            </MenuList>
          </Menu>
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
