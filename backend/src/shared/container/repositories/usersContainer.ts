import { container } from 'tsyringe';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import UsersRepository from '@domain/users/infra/typeorm/repositories/UsersRepository';

import IFollowsRepository from '@domain/users/repositories/IFollowsRepository';
import FollowsRepository from '@domain/users/infra/typeorm/repositories/FollowsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IFollowsRepository>(
  'FollowsRepository',
  FollowsRepository,
);
