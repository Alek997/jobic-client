import { API_URL } from 'config/params'
import { useQuery } from 'react-query'
import { UserInfoDto } from '../types/dto'
import { http } from './httpService'

export const fetchUserInfo = () =>
  http.get<UserInfoDto>(API_URL + '/user').then(({ data }) => data)

export const fetchUser = id =>
  http
    .get<{ data: UserInfoDto }>(API_URL + `/user/${id}`)
    .then(({ data }) => data.data)

export const useUserInfo = () => useQuery('userInfo', fetchUserInfo)

export const useEmployer = userId =>
  useQuery(['employer', userId], () => fetchUser(userId))

export const updateUserInfo = (user: UserInfoDto) =>
  http.put<UserInfoDto>(API_URL + '/user', user).then(({ data }) => data)
