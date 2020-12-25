import { EntityRepository, Repository } from 'typeorm';

import Follows from '../models/entities/Follows';

interface FollowsCount {
  following: number;
  followers: number;
}

@EntityRepository(Follows)
class FollowsRepositories extends Repository<Follows> {
  public async getFollowsCountByUser(user_id: string): Promise<FollowsCount> {
    const followers = await this.count({ where: { follow_id: user_id } });
    const following = await this.count({ where: { user_id } });

    return { followers, following };
  }
}

export default FollowsRepositories;
