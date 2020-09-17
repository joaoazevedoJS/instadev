export interface ICreateCommentary {
  message: string;
  publication_id: number;
  user_id: number;
  created_at: string;
}

export interface IComment extends ICreateCommentary {
  id: number;
}

export interface ISearchComments extends IComment {
  likes: number;
  user_name: string;
}

export interface ICreateCommentaryOfComments {
  user_id: number;
  message: string;
  comment_id: number;
  created_at: string;
}

export interface ICommentaryOfComments {
  id: number;
  message: string;
  user_id: number;
  comment_id: number;
  created_at: string;
}

export interface ICommentaryWithComments {
  id: number;
  user_name: string;
  user_id: number;
  message: string;
  created_at: string;
}

export interface ICommentWhere {
  id: number;
  user_id: number;
}
