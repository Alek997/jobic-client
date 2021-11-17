import React from 'react'
import { Box, Center } from '@chakra-ui/layout'
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
import { Form, Formik } from 'formik'
import { NumberInput, TextAreaInput } from './FormInput'
import { useToast } from '@chakra-ui/toast'
import { NewReview, UserInfoDto } from 'types/dto'
import { createReview } from 'services/reviewService'

const defaultReview: NewReview = {
  description: '',
  rating: 4,
  ratedUser: '',
  createdBy: ''
}

interface Props {
  employer: UserInfoDto
  isOpen: boolean
  onClose(): void
}

const RateUserModal: React.FC<Props> = ({ employer, isOpen, onClose }) => {
  const toast = useToast()
  const onSubmit = async (values: NewReview) => {
    try {
      await createReview({ ...values, ratedUser: employer._id }).then(() => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rate user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center width="100%">
            <Formik initialValues={defaultReview} onSubmit={onSubmit}>
              {props => (
                <Form>
                  <Box mt="3" marginX="2">
                    <NumberInput fieldName="rating" placeholder="Rating" />
                  </Box>
                  <Box mt="3" marginX="2">
                    <TextAreaInput
                      fieldName="description"
                      placeholder="Description"
                    />
                  </Box>

                  <Button
                    mt="3"
                    marginBottom="10"
                    marginX="2"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Rate user
                  </Button>
                </Form>
              )}
            </Formik>
          </Center>
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

export default RateUserModal
