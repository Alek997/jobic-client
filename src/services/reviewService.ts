import { API_URL } from 'config/params'
import { useQuery } from 'react-query'
import { http } from './httpService'
import { NewReview, ReviewDto } from 'types/dto'

export const createReview = (review: NewReview) =>
  http
    .post<{ data: ReviewDto }>(API_URL + '/review', review)
    .then(({ data }) => data.data)

export const updateReview = (review: ReviewDto) =>
  http
    .put<{ data: ReviewDto }>(`${API_URL}/review/${review._id}`, review)
    .then(({ data }) => data.data)

export const fetchUserReviews = userId =>
  http
    .get<{ data: ReviewDto[] }>(`${API_URL}/review/findByUser/${userId}`)
    .then(({ data }) => data.data)

export const useEmployerReviews = userId =>
  useQuery(['reviews', userId], () => fetchUserReviews(userId))
