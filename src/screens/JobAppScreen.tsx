import React from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Center } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { useToast } from '@chakra-ui/toast'
import { useJob } from 'services/jobService'
import { useParams } from 'react-router-dom'
import { createJobApp } from 'services/jobAppService'
import { TextAreaInput } from 'components/FormInput'
import Spinner from 'components/Spinner'

const JobAppScreen: React.FC<any> = () => {
  const toast = useToast()
  const { id } = useParams()
  const job = useJob(id)

  if (job.error) return <div>Error</div>

  if (job.status === 'loading') return <Spinner />

  const onSubmit = async (values: { message: string }) => {
    try {
      await createJobApp({ ...values, jobId: id }).then(() => {
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
    <Center width="100%" minH="85vh">
      <Formik
        initialValues={{
          message: 'Prijava mi mnogo znaci'
        }}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Box mt="3" marginX="2">
              <TextAreaInput fieldName="message" placeholder="Message" />
            </Box>
            <Button mt={4} isLoading={props.isSubmitting} type="submit">
              Apply
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

export default JobAppScreen
