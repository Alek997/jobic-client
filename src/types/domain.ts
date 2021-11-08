export interface Job {
  name: string
  city: string
  address: string
  imageUrl: string
  description: string
  categoryId: string
  budget: string
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  last: boolean
  size: number
}
