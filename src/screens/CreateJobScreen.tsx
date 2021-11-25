import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { createJob } from 'services/jobService'
import { Job } from 'types/domain'
import { useCategories } from 'services/categoryService'
import {
  ImageInput,
  SelectInput,
  TextAreaInput,
  TextInput
} from 'components/FormInput'
import useToaster from 'shared/useToaster'
import * as Yup from 'yup'
import { useHistory } from 'react-router'
import { routePaths } from 'config/routes'
import { queryClient } from 'config/query'

const CreateJobSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  categoryId: Yup.string().required('Required'),
  budget: Yup.number()
    .required('Required')
    .typeError('Invalid number')
})

const defaultJob = {
  name: '',
  city: '',
  address: '',
  description: '',
  categoryId: null,
  budget: undefined
}

const CreateJobScreen: React.FC<any> = () => {
  const toast = useToaster()
  const categories = useCategories()
  const history = useHistory()
  const onSubmit = async (values: Job) => {
    try {
      await createJob(values).then(() => {
        toast.success()
        history.push(routePaths.JOBS)
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'infinityJobs'
        })
      })
    } catch {
      toast.error()
    }
  }
  return (
    <Center width="100%" pt="20px" flexDirection="column" minH="85vh">
      <Heading size="lg">Create job</Heading>
      <Formik
        validationSchema={CreateJobSchema}
        initialValues={defaultJob}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Box mt="3" marginX="2">
              <TextInput fieldName="name" placeholder="Job title" />
            </Box>

            <Flex direction={['column', 'row']}>
              <Box mt="3" marginX="2">
                <TextInput fieldName="city" placeholder="City" />
              </Box>
              <Box mt="3" marginX="2">
                <TextInput fieldName="address" placeholder="Address" />
              </Box>
            </Flex>

            <Box mt="3" marginX="2">
              <ImageInput fieldName="imageUrl" />
            </Box>
            <Box mt="3" marginX="2">
              <TextAreaInput
                fieldName="description"
                placeholder="Description"
              />
            </Box>
            <Box mt="3" marginX="2">
              <SelectInput
                fieldName="categoryId"
                placeholder="Category"
                options={categories.data}
              />
            </Box>
            <Box mt="3" marginX="2">
              <TextInput fieldName="budget" placeholder="Budget" />
            </Box>

            <Button
              mt="3"
              marginBottom="10"
              marginX="2"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Create job
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

export default CreateJobScreen
