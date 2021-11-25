import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { updateJob, useJob } from 'services/jobService'
import { useParams } from 'react-router-dom'
import { JobDto } from 'types/dto'
import {
  ImageInput,
  SelectInput,
  TextAreaInput,
  TextInput
} from 'components/FormInput'
import { useCategories } from 'services/categoryService'
import Spinner from 'components/Spinner'
import useToaster from 'shared/useToaster'
import * as Yup from 'yup'
import Error from 'components/Error'
import { useHistory } from 'react-router'
import { routePaths } from 'config/routes'

const EditJobSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  categoryId: Yup.string().required('Required'),
  budget: Yup.number()
    .required('Required')
    .typeError('Invalid number')
})

const EditJobScreen: React.FC<any> = () => {
  const toast = useToaster()
  const { id } = useParams()
  const job = useJob(id)
  const categories = useCategories()
  const history = useHistory()

  if (job.error) return <Error />

  if (job.status === 'loading') return <Spinner />

  const onSubmit = async (values: JobDto) => {
    try {
      await updateJob(values).then(() => {
        toast.success()
        history.push(routePaths.MY_PROFILE)
      })
    } catch {
      toast.error()
    }
  }
  return (
    <Center flexDirection="column" width="100%" pt="20px" minH="85vh">
      <Heading size="lg">Edit job</Heading>

      <Formik
        initialValues={job.data}
        onSubmit={onSubmit}
        validationSchema={EditJobSchema}
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
              Edit job
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

export default EditJobScreen
