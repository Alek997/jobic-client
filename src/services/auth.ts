import { BASE_URL } from '../config/params'
import { http } from './httpService'
import { skip } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import useObservable from '../shared/useObservable'
import to from 'await-to-js'
import { useAsync } from 'react-use'
import { queryClient } from 'config/query'
import { identity } from 'lodash'
import { AxiosInstance } from 'axios'

const AUTH_URL = BASE_URL
const AUTH_HEADER = 'Authorization'

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthRegister {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

interface AuthResponseDto {
  token: string
}

export const user$ = new BehaviorSubject<AuthResponseDto>(null)

export const useUser = () => useObservable(user$, user$.value)

export const getUser = async (): Promise<AuthResponseDto> => {
  const localUser = localStorage.getItem('user')

  if (localUser) {
    return JSON.parse(localUser)
  }
  return null
}

export const init = async (fetchUser: () => Promise<AuthResponseDto>) => {
  const [err, user] = await to(fetchUser())
  if (err) {
    user$.next(null)
  } else {
    user$.next(user)
  }
}

export const login = async (credentials: AuthCredentials) => {
  const user = await http.post<AuthResponseDto>(
    `${BASE_URL}/login`,
    credentials
  )
  user$.next({ ...user.data })
  return user
}
export const logout = () => user$.next(null)

export const register = async (newUser: AuthRegister) => {
  const user = await http.post<AuthResponseDto>(`${BASE_URL}/register`, newUser)
  return user
}

export const useAuthInit = () =>
  useAsync(() =>
    init(async () => {
      const user = await getUser()
      if (user) {
        return user
      }
      return null
    })
  )

export const enhanceAxiosInstance = (axiosInstance: AxiosInstance) => {
  let interceptorId: number

  return (user: AuthResponseDto | null) => {
    if (!user) {
      delete axiosInstance.defaults.headers[AUTH_HEADER]
      axiosInstance.interceptors.response.eject(interceptorId)
    } else {
      axiosInstance.defaults.headers[AUTH_HEADER] = 'Bearer ' + user.token

      interceptorId = axiosInstance.interceptors.response.use(
        identity,
        async error => {
          const originalRequest = error.config

          if (originalRequest.url === AUTH_URL) {
            return Promise.reject(error)
          }

          if (error.response?.status === 401) {
            logout()
          }

          return Promise.reject(error)
        }
      )
    }
  }
}
const initHttpInterceptors = enhanceAxiosInstance(http)

user$.pipe(skip(1)).subscribe(user => {
  initHttpInterceptors(user)

  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    queryClient.clear()
    localStorage.removeItem('user')
  }
})
