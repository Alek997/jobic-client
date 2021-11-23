import { Button } from '@chakra-ui/button'

import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import React from 'react'
import * as auth from 'services/auth'
import { useHistory } from 'react-router-dom'
import { routePaths } from 'config/routes'
import { NavLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import JoCenter from 'components/Containers'
import { PasswordInput, TextInput } from 'components/FormInput'
import useToaster from 'shared/useToaster'

const RegisterScreen: React.FC<any> = () => {
  const toast = useToaster()
  const history = useHistory()
  const onSubmit = async (values: auth.AuthRegister) => {
    try {
      await auth.register(values).then(() => {
        toast.success()
        history.push(routePaths.LOGIN)
      })
    } catch {
      toast.error()
    }
  }
  return (
    <JoCenter>
      <Flex justifyContent="center">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: ''
          }}
          onSubmit={onSubmit}
        >
          {props => (
            <Form>
              <Heading>Register</Heading>
              <Box marginY="5">
                <TextInput fieldName="firstName" placeholder="First name" />
              </Box>
              <Box marginY="5">
                <TextInput fieldName="lastName" placeholder="Last name" />
              </Box>
              <Box marginY="5">
                <TextInput fieldName="email" placeholder="Email" />
              </Box>
              <Box marginY="5">
                <TextInput fieldName="phone" placeholder="Phone" />
              </Box>
              <Box marginY="5">
                <PasswordInput fieldName="password" placeholder="Password" />
              </Box>
              <Flex direction="column">
                <Button isLoading={props.isSubmitting} type="submit">
                  Sign up
                </Button>
                or
                <NavLink to={routePaths.LOGIN}>
                  <Link>Sign in</Link>
                </NavLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </JoCenter>
  )
}

export default RegisterScreen
