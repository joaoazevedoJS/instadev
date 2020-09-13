export interface ICreatePublication {
  photo: string
  description: string
  date: string
  user_id: number
}

export interface IPublications extends ICreatePublication {
  id: number
  views: number
}

export interface IUserPublications extends ICreatePublication, IPublications {
  likes: number
}

export interface IExplorerPublications extends IUserPublications {
  user_name: string
}

export interface IWherePublications {
  id: number,
  user_id: number
}
