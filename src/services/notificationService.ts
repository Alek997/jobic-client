import { API_URL } from 'config/params'
import { http } from './httpService'
import { NotificationDto } from 'types/dto'

export const disableNotification = (notification: NotificationDto) =>
  http
    .put<{ data: NotificationDto }>(
      `${API_URL}/notification/${notification._id}`,
      { ...notification, status: 'inactive' }
    )
    .then(({ data }) => data.data)

export const fetchNotifications = () =>
  http
    .get<{ data: NotificationDto[] }>(`${API_URL}/notification`)
    .then(({ data }) => data.data.reverse())
