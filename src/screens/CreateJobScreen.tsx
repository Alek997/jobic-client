import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { useToast } from '@chakra-ui/toast'
import { createJob } from 'services/jobService'
import { Job } from 'types/domain'
import { useCategories } from 'services/categoryService'
import {
  ImageInput,
  SelectInput,
  TextAreaInput,
  TextInput
} from 'components/FormInput'

const defaultJob = {
  name: 'Posao',
  city: 'Beograd',
  address: 'Neka ulica 1',
  imageUrl: 'https://via.placeholder.com/1920x1080/eee?text=16:9',
  description: 'Neki opis okej',
  categoryId: null,
  budget: '200'
}

const CreateJobScreen: React.FC<any> = () => {
  const toast = useToast()
  const categories = useCategories()
  const onSubmit = async (values: Job) => {
    try {
      await createJob(values).then(() => {
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
    <Center width="100%" pt="20px" flexDirection="column">
      <Heading size="lg">Create job</Heading>
      <Formik initialValues={defaultJob} onSubmit={onSubmit}>
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
