import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import React from 'react'
import { useToast } from '@chakra-ui/toast'
import * as auth from 'services/auth'
import { NavLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import { PasswordInput, TextInput } from 'components/FormInput'
import JoCenter from 'components/Containers'
import { routePaths } from 'config/routes'
import { useHistory } from 'react-router'

const LoginScreen: React.FC<any> = () => {
  const toast = useToast()
  const history = useHistory()
  const onSubmit = async (values: auth.AuthCredentials) => {
    try {
      await auth.login(values).then(() => {
        toast({
          title: 'Successful',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
        history.push(routePaths.HOME)
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
    <JoCenter>
      <Flex justifyContent="center">
        <Formik
          initialValues={{
            email: 'alek@gmail.com',
            password: '12345678'
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
