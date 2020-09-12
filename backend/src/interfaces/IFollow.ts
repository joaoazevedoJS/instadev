export interface IFollowing {
  id: number
  user_id: number
  following_id: number
}

export interface IFollowers {
  id: number
  user_id: number
  followers_id: number
}

export interface IFollow {
  user_id: number,
  following_id: number
}
