import IFollows from '../entities/IFollows';

import IFollowDTO from '../dtos/IFollowDTO';
import IFollowsCountDTO from '../dtos/IFollowsCountDTO';

interface IFollowsRepository {
  create(data: IFollowDTO): Promise<IFollows>;
  delete(id: string): Promise<void>;
  getFollowsCountByUser(id: string): Promise<IFollowsCountDTO>;

  findFollowIds(
    user_id: string,
    follow_id: string,
  ): Promise<IFollows | undefined>;
}

export default IFollowsRepository;
