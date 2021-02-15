import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@domain/users/services/UpdateUserAvatarService';

class AvatarUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    await updateUserAvatar.execute({ user_id: id, filename });

    return response.status(204).send();
  }
}

export default AvatarUserController;
