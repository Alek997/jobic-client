import React from 'react'
import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Center, FormControl, useColorModeValue } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'
import { Field, Form, Formik } from 'formik'
import { routePaths } from 'config/routes'
import { useHistory } from 'react-router'
import { isEmpty, omitBy } from 'lodash'
import * as Yup from 'yup'
import useToaster from 'shared/useToaster'

const HomeSearchSchema = Yup.object().shape({
  name: Yup.string(),
  city: Yup.string()
})

interface SearchForm {
  name: string
  city: string
}

const HomeScreenSearch = () => {
  const history = useHistory()
  const toast = useToaster()
  const onSubmit = async (values: SearchForm) => {
    const params = new URLSearchParams(omitBy(values, isEmpty))

    try {
      history.replace({
        pathname: routePaths.JOBS,
        search: params.toString()
      })
    } catch {
      toast.error()
    }
  }
  return (
    <Formik
      initialValues={{
        name: '',
        city: ''
      }}
      onSubmit={onSubmit}
      validationSchema={HomeSearchSchema}
    >
      {props => (
        <Center w="100%">
          <Form
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Flex direction={['column', 'row']}>
              <Flex marginRight={['0', '20px']} alignSelf={'center'}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        id="name"
                        placeholder="Search"
                        fontSize="21px"
                        bgColor={useColorModeValue('white', 'teal.400')}
                        marginBottom={['10px']}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex marginRight={['0px', '20px']}>
                <Field name="city">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.city && form.touched.city}
                    >
                      <Input
                        {...field}
                        id="city"
                        placeholder="City"
                        fontSize="21px"
                        color="black"
                        bgColor={useColorModeValue('white', 'teal.400')}
                        marginBottom={['10px']}
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Button
                isLoading={props.isSubmitting}
                type="submit"
                paddingX={'30px'}
                size="md"
              >
                <SearchIcon />
              </Button>
            </Flex>
          </Form>
        </Center>
      )}
    </Formik>
  )
}

export default HomeScreenSearch
