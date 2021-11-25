import { API_URL } from 'config/params'
import { useInfiniteQuery, useQuery } from 'react-query'
import { http } from './httpService'
import { Job, Page } from 'types/domain'
import { JobDto } from 'types/dto'

export const createJob = (job: Job) =>
  http
    .post<{ data: JobDto }>(API_URL + '/job', job)
    .then(({ data }) => data.data)

export const updateJob = (job: JobDto) =>
  http
    .put<{ data: JobDto }>(`${API_URL}/job/${job._id}`, job)
    .then(({ data }) => data.data)

export const fetchMyJobs = () =>
  http.get<{ data: JobDto[] }>(API_URL + '/job').then(({ data }) => data.data)

export const fetchJobs = params =>
  http
    .get<{ data: JobDto[] }>(API_URL + '/job/all', { params })
    .then(({ data }) => data.data)

export const fetchUserJobs = userId =>
  http
    .get<{ data: JobDto[] }>(`${API_URL}/job/findByUser/${userId}`)
    .then(({ data }) => data.data)

export const fetchJob = jobId =>
  http
    .get<{ data: JobDto }>(`${API_URL}/job/${jobId}`)
    .then(({ data }) => data.data)

export const useJobs = params =>
  useQuery(['jobs', ...params], () => fetchJobs(params))
export const useEmployerJobs = userId =>
  useQuery(['employerJobs', userId], () => fetchUserJobs(userId))
export const useMyJobs = () => useQuery('myJobs', fetchMyJobs)
export const useJob = id =>
  useQuery(['job', id], () => fetchJob(id), { enabled: !!id })

export const fetchInfiniteJobs = async params => {
  const { data } = await http.get<Page<JobDto>>(API_URL + '/job/all', {
    params
  })
  return data
}
function paramsToObject(entries) {
  const result = {}
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value
  }
  return result
}
export const useInfiniteJobsQuery = params => {
  const paramsObject = paramsToObject(params.entries())
  return useInfiniteQuery(
    ['infinityJobs', paramsObject],
    ({ pageParam = 1 }) =>
      fetchInfiniteJobs({
        pageParam,
        size: 12,
        status: 'active',
        ...paramsObject
      }),
    {
      keepPreviousData: true,
      getNextPageParam: lastPage =>
        lastPage.last ? undefined : lastPage.currentPage + 1
    }
  )
}
