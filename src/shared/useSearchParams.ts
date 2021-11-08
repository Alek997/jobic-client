import { useLocation } from 'react-use'

const useSearchParams = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  return params
}

export default useSearchParams
