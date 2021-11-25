import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { updateUserInfo, useUserInfo } from 'services/userService'
import { UserInfoDto } from 'types/dto'
import Spinner from 'components/Spinner'
import { ImageInput, TextAreaInput, TextInput } from 'components/FormInput'
import useToaster from 'shared/useToaster'
import * as Yup from 'yup'
import Error from 'components/Error'
import { useHistory } from 'react-router'
import { queryClient } from 'config/query'
import { routePaths } from 'config/routes'

const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string(),
  summary: Yup.string()
})

const EditProfileScreen: React.FC<any> = () => {
  const toast = useToaster()
  const userInfo = useUserInfo()
  const history = useHistory()

  if (userInfo.error) return <Error />

  if (userInfo.status === 'loading') return <Spinner />

  const onSubmit = async (values: UserInfoDto) => {
    try {
      await updateUserInfo(values).then(() => {
        toast.success()
        console.log('desava')

        history.push(routePaths.MY_PROFILE)
        queryClient.invalidateQueries('userInfo')
      })
    } catch {
      toast.error()
    }
  }
  return (
    <Center flexDirection="column" width="100%" pt="20px" minH="85vh">
      <Heading size="lg">Edit Your Profile</Heading>
      <Formik
        initialValues={userInfo.data}
        onSubmit={onSubmit}
        validationSchema={EditProfileSchema}
      >
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
