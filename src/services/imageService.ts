import { API_URL } from 'config/params'
import { http } from './httpService'

export const uploadImage = (file: File) => {
  const formData = new FormData()

  formData.append('image', file)
  return http.post<string>(API_URL + '/upload', formData)
}
