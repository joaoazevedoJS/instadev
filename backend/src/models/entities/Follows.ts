class UsersFollow {
  public id: number;

  public created_at: Date;

  public user_id: number;

  public following_id: number;

  constructor({
    user_id,
    following_id,
  }: Omit<UsersFollow, 'id' | 'created_at'>) {
    this.following_id = following_id;
    this.user_id = user_id;

    this.created_at = new Date();
  }
}

export default UsersFollow;
