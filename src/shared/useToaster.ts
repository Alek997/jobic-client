import { useToast } from '@chakra-ui/toast'

const useToaster = () => {
  const toast = useToast()

  return {
    success: () =>
      toast({
        title: 'Successful',
        status: 'success',
        duration: 2000,
        isClosable: true
      }),
    error: () =>
      toast({
        title: 'Error',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
  }
}

export default useToaster
