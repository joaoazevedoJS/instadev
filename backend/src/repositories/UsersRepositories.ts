import { EntityRepository, Repository } from 'typeorm';

import Users from '../models/entities/Users';

@EntityRepository(Users)
class UsersRepositories extends Repository<Users> {}

export default UsersRepositories;
