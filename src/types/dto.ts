export interface UserInfoDto {
  _id: string
  createdAt: string
  email: string
  firstName: string
  lastName: string
  phone: string
  updatedAt: string
  imageUrl?: string
  avgRating?: number
  summary?: string
}

export interface JobDto {
  _id: string
  name: string
  city: string
  address: string
  imageUrl: string
  categoryId: string
  status: string
  description: string
  budget: string
  createdAt: string
  createdBy: string
  updatedAt: string
}

export interface JobAppDto {
  _id: string
  message: string
  status: 'employed' | 'pending' | 'not_employed'
  createdBy: UserInfoDto
  jobId: string
}

export interface CategoryDto {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface ReviewDto {
  _id: string
  description: string
  rating: number
  ratedUser: UserInfoDto
  createdBy: UserInfoDto
  createdAt: string
  updatedAt: string
}
export interface NewReview {
  description: string
  rating: number
  ratedUser: string
}

export interface NotificationDto {
  _id: string
  title: string
  description: string
  user: string
  createdAt: string
  updatedAt: string
  status: string
  reference: string
}
