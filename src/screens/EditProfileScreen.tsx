import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { updateUserInfo, useUserInfo } from 'services/userService'
import { useToast } from '@chakra-ui/toast'
import { UserInfoDto } from 'types/dto'
import Spinner from 'components/Spinner'
import {
  ImageInput,
  PasswordInput,
  TextAreaInput,
  TextInput
} from 'components/FormInput'

const EditProfileScreen: React.FC<any> = () => {
  const toast = useToast()
  const userInfo = useUserInfo()

  if (userInfo.error) return <div>Error</div>

  if (userInfo.status === 'loading') return <Spinner />

  const onSubmit = async (values: UserInfoDto) => {
    try {
      await updateUserInfo(values).then(() => {
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
    <Center width="100%" flexDirection="column" pt="10">
      <Heading size="lg">Edit Your Profile</Heading>
      <Formik initialValues={userInfo.data} onSubmit={onSubmit}>
        {props => (
          <Form>
            <Flex direction={['column', 'row']}>
              <Flex direction={['column']} marginRight={['0', '5']}>
                <Box mt="3" marginX="2">
                  <ImageInput fieldName="imageUrl" />
                </Box>
                <Box mt="3" marginX="2">
                  <TextAreaInput fieldName="summary" placeholder="Summary" />
                </Box>
              </Flex>
              <Flex direction={['column']}>
                <Box mt="3" marginX="2">
                  <TextInput fieldName="firstName" placeholder="First name" />
                </Box>
                <Box mt="3" marginX="2">
                  <TextInput fieldName="lastName" placeholder="Last name" />
                </Box>
                <Box mt="3" marginX="2">
                  <TextInput fieldName="email" placeholder="Email" />
                </Box>
                <Box mt="3" marginX="2">
                  <TextInput fieldName="phone" placeholder="Phone" />
                </Box>
                <Box mt="3" marginX="2">
                  <PasswordInput fieldName="password" placeholder="Password" />
                </Box>
              </Flex>
            </Flex>

            <Button
              mt="3"
              marginBottom="10"
              marginX="2"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

export default EditProfileScreen
