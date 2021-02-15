import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidateUUIDService from '@shared/services/auth/ValidateUUIDService';
import CreateFollowService from '@domain/users/services/follow/CreateFollowService';
import DeleteFollowService from '@domain/users/services/follow/DeleteFollowService';

class FollowsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { follow_id } = request.params;
    const { id } = request.user;

    const validateUUID = container.resolve(ValidateUUIDService);

    validateUUID.execute(follow_id);

    const createFollow = container.resolve(CreateFollowService);

    const follow = await createFollow.execute({ follow_id, user_id: id });

    return response.status(201).json(follow);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { follow_id } = request.params;
    const { id } = request.user;

    const validateUUID = container.resolve(ValidateUUIDService);

    validateUUID.execute(follow_id);

    const deleteFollow = container.resolve(DeleteFollowService);

    await deleteFollow.execute({ follow_id, user_id: id });

    return response.status(204).send();
  }
}

export default FollowsController;
