export interface ICreateLike {
  user_id: number
  publication_id: number
  created_at: string
}

export interface ILike extends ICreateLike {
  id: number
}

export interface ILikeWhere {
  publication_id: number
  user_id: number
}
