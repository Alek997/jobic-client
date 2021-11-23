import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { useJob } from 'services/jobService'
import { useParams } from 'react-router-dom'
import { createJobApp } from 'services/jobAppService'
import { TextAreaInput } from 'components/FormInput'
import Spinner from 'components/Spinner'
import JobItem from 'components/JobItem'
import useToaster from 'shared/useToaster'
import * as Yup from 'yup'
import Error from 'components/Error'

const JobAppSchema = Yup.object().shape({
  message: Yup.string().required('Required')
})

const JobAppScreen: React.FC<any> = () => {
  const toast = useToaster()
  const { id } = useParams()
  const job = useJob(id)

  if (job.error) return <Error />

  if (job.status === 'loading') return <Spinner />

  const onSubmit = async (values: { message: string }) => {
    try {
      await createJobApp({ ...values, jobId: id }).then(() => {
        toast.success()
      })
    } catch {
      toast.error()
    }
  }
  return (
    <Center
      width="100%"
      minH="85vh"
      flexDirection={['column', 'row']}
      py="30px"
      justifyContent="space-evenly"
    >
      <Flex mY={['0', '10']}>
        <Formik
          initialValues={{
            message: ''
          }}
          onSubmit={onSubmit}
          validationSchema={JobAppSchema}
        >
          {props => (
            <Form>
              <Heading size="lg">New Job Application</Heading>

              <Box mt="3" marginX="2">
                <TextAreaInput
                  hideLabel
                  fieldName="message"
                  placeholder="Message"
                  size="lg"
                  minH="30vh"
                />
              </Box>
              <Button mt={4} isLoading={props.isSubmitting} type="submit">
                Apply
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>

      <Flex
        mY={['0', '10']}
        basis={{ base: '100%', md: '49%', lg: '32%', xl: '24%' }}
        alignItems="center"
        justify="center"
        key={job.data?._id}
      >
        <JobItem job={job.data} enableModal={false} />
      </Flex>
    </Center>
  )
}

export default JobAppScreen
