import React from 'react'
import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import { Center, Box, Flex } from '@chakra-ui/react'
import { useCategories } from 'services/categoryService'
import { Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { isEmpty, omitBy } from 'lodash'
import { routePaths } from 'config/routes'
import useSearchParams from 'shared/useSearchParams'
import { SelectInput, TextInput } from './FormInput'

const JobsFilter = () => {
  const history = useHistory()
  const categories = useCategories()

  const params = useSearchParams()

  const onSubmit = async (values: any) => {
    const params = new URLSearchParams(omitBy(values, isEmpty))

    try {
      history.replace({
        pathname: routePaths.JOBS,
        search: params.toString()
      })
    } catch {
      console.log('error in Jobs filter')
    }
  }
  return (
    <Formik
      initialValues={{
        name: params.get('name') || '',
        city: params.get('city') || '',
        category: '',
        budgetFrom: '',
        budgetTo: ''
      }}
      onSubmit={onSubmit}
    >
      {props => (
        <Center w="100%">
          <Form>
            <Flex
              paddingX={['20px', '40px']}
              direction={['column']}
              align="center"
            >
              <Flex mt="3" w="100%" flexDirection="row">
                <TextInput fieldName="name" placeholder="Search" />
                <Button
                  alignSelf="end"
                  ml={'2'}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  <SearchIcon />
                </Button>
              </Flex>
              <Flex wrap="wrap" justify="space-between">
                <Box mt="3" flexBasis={['100%', '48%']}>
                  <TextInput fieldName="city" placeholder="City" />
                </Box>
                <Box mt="3" flexBasis={['100%', '48%']}>
                  <SelectInput
                    fieldName="categoryId"
                    placeholder="Sve kategorije"
                    options={categories.data}
                  />
                </Box>
                <Box mt="3" flexBasis={['100%', '48%']}>
                  <TextInput fieldName="budgetFrom" placeholder="Budget From" />
                </Box>

                <Box mt="3" flexBasis={['100%', '48%']}>
                  <TextInput fieldName="budgetTo" placeholder="Budget To" />
                </Box>
              </Flex>
            </Flex>
          </Form>
        </Center>
      )}
    </Formik>
  )
}

export default JobsFilter
