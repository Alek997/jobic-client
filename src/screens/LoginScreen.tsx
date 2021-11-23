import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import React from 'react'
import * as auth from 'services/auth'
import { NavLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import { PasswordInput, TextInput } from 'components/FormInput'
import JoCenter from 'components/Containers'
import { routePaths } from 'config/routes'
import { useHistory } from 'react-router'
import useToaster from 'shared/useToaster'

const LoginScreen: React.FC<any> = () => {
  const toast = useToaster()
  const history = useHistory()
  const onSubmit = async (values: auth.AuthCredentials) => {
    try {
      await auth.login(values).then(() => {
        toast.success()
        history.push(routePaths.HOME)
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
            email: '',
            password: ''
          }}
          onSubmit={onSubmit}
        >
          {props => (
            <Form>
              <Heading>Welcome</Heading>
              <Box marginY="5">
                <TextInput fieldName="email" placeholder="Email" />
              </Box>
              <Box marginY="5">
                <PasswordInput fieldName="password" placeholder="Password" />
              </Box>
              <Flex direction="column">
                <Button isLoading={props.isSubmitting} type="submit">
                  Sign in
                </Button>
                or
                <NavLink to={routePaths.REGISTER}>
                  <Link>Sign up</Link>
                </NavLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </JoCenter>
  )
}

export default LoginScreen
