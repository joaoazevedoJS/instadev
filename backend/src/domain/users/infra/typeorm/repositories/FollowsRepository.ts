import { getRepository, Repository } from 'typeorm';

import IFollowsRepository from '@domain/users/repositories/IFollowsRepository';
import IFollows from '@domain/users/entities/IFollows';

import IFollowsCountDTO from '@domain/users/dtos/IFollowsCountDTO';

import IFollowDTO from '@domain/users/dtos/IFollowDTO';
import Follows from '../entities/Follows';

class FollowsRepository implements IFollowsRepository {
  private repository: Repository<IFollows>;

  constructor() {
    this.repository = getRepository(Follows);
  }

  public async create({ user_id, follow_id }: IFollowDTO): Promise<IFollows> {
    const follow = this.repository.create({
      user_id,
      follow_id,
    });

    await this.repository.save(follow);

    return follow;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getFollowsCountByUser(
    user_id: string,
  ): Promise<IFollowsCountDTO> {
    const followers = await this.repository.count({
      where: { follow_id: user_id },
    });

    const following = await this.repository.count({ where: { user_id } });

    return { followers, following };
  }

  public async findFollowIds(
    user_id: string,
    follow_id: string,
  ): Promise<IFollows | undefined> {
    const follow = await this.repository.findOne({
      where: { user_id, follow_id },
    });

    return follow;
  }
}

export default FollowsRepository;
