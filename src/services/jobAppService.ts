import { API_URL } from 'config/params'
import { http } from './httpService'
import { JobAppDto } from 'types/dto'
import { useQuery } from 'react-query'

export const createJobApp = (jobApp: { message: string; jobId: string }) =>
  http
    .post<{ data: JobAppDto }>(API_URL + '/jobApp', jobApp)
    .then(({ data }) => data.data)

export const fetchJobApps = jobId =>
  http
    .get<{ data: JobAppDto[] }>(`${API_URL}/jobApp/app/${jobId}`)
    .then(({ data }) => data.data)

export const fetchMyJobApps = () =>
  http
    .get<{ data: JobAppDto[] }>(`${API_URL}/jobApp`)
    .then(({ data }) => data.data)

export const fetchJobApp = jobAppId =>
  http
    .get<{ data: JobAppDto }>(`${API_URL}/jobApp/${jobAppId}`)
    .then(({ data }) => data.data)

export const acceptJobApp = jobApp =>
  http
    .put<{ data: JobAppDto }>(`${API_URL}/jobApp/${jobApp._id}`, {
      ...jobApp,
      status: 'employed'
    })
    .then(({ data }) => data.data)

export const acceptOnlyJobApp = jobApp =>
  http
    .put<{ data: JobAppDto }>(`${API_URL}/jobApp/${jobApp._id}`, {
      ...jobApp,
      status: 'employed',
      only: true
    })
    .then(({ data }) => data.data)

export const denyJobApp = jobApp =>
  http
    .put<{ data: JobAppDto }>(`${API_URL}/jobApp/${jobApp._id}`, {
      ...jobApp,
      status: 'not_employed'
    })
    .then(({ data }) => data.data)

export const useJobApps = jobId =>
  useQuery(['jobApps', jobId], () => fetchJobApps(jobId), {
    enabled: !!jobId
  })
export const useMyJobApps = () => useQuery('myJobApps', () => fetchMyJobApps())
