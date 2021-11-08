import { API_URL } from 'config/params'
import { useQuery } from 'react-query'
import { http } from './httpService'
import { CategoryDto } from 'types/dto'

export const fetchCategories = () =>
  http
    .get<{ data: CategoryDto[] }>(API_URL + '/category/all')
    .then(({ data }) => data.data)

export const fetchCategory = categoryId =>
  http
    .get<{ data: CategoryDto }>(`${API_URL}/category/${categoryId}`)
    .then(({ data }) => data.data)

export const useCategories = () => useQuery('categories', fetchCategories)
export const useCategory = id =>
  useQuery(['category', id], () => fetchCategory(id), { enabled: !!id })
