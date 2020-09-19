export interface ICreateLike {
  user_id: number
  publication_id: number
  created_at: string
}

export interface ILike extends ICreateLike {
  id: number
}

export interface ILikeWhere {
  user_id: number
  publication_id: number
}

export interface ILikeWhereCommentaryOfComments {
  user_id: number
  commentary_comments_id: number
}

export interface ICreateLikeCommentaryOfComments {
  user_id: number
  commentary_comments_id: number
  created_at: string
}

export interface ILikeCommentaryOfComments extends ICreateLikeCommentaryOfComments {
  id: number
}

export interface ICreateLikeComments {
  user_id: number
  comments_id: number
  created_at: string
}

export interface ILikeWhereComments {
  user_id: number
  comments_id: number
}

export interface ILikeComments extends ICreateLikeComments {
  id: number
}
