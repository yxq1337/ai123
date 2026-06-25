
export interface Review {
  rating: number
  ourExperience: string
  pros: string[]
  cons: string[]
  author: string
  lastUpdated: string
}

export interface Tool {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  categories: string[]
  url: string
  review: Review
  alternatives: string[]
  createdAt: string
  updatedAt: string
}

export interface Author {
  name: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}
