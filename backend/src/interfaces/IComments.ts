export interface ICreateCommentary {
  message: string
  publication_id: number
  user_id: number
}

export interface IComment extends ICreateCommentary {
  id: number
  created_at: string
}
