import React, { useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
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
import { NotificationDto } from 'types/dto'
import dayjs from 'dayjs'
import { disableNotification } from 'services/notificationService'
import { queryClient } from 'config/query'
import { useJob } from 'services/jobService'

interface Props {
  notification: NotificationDto
  isOpen: boolean
  onClose(): void
}

const NotificationModal: React.FC<Props> = ({
  notification,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (notification.status === 'active') {
      disableNotification(notification)
      queryClient.invalidateQueries('notifications')
    }
  }, [])

  const job = useJob(notification.reference)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{notification.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex width="100%" direction="column" align="center">
            <Text>{dayjs(notification.createdAt).format('DD.MM.YYYY')}</Text>
            <Text>{notification.description}</Text>
            <Text>{`Job title - ${job.data?.name}`}</Text>
          </Flex>
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

export default NotificationModal
