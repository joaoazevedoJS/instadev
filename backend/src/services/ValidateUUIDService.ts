import { validate } from 'uuid';

import AppError from '../errors/AppError';

class ValidateUUIDService {
  public execute(uuid: string): void {
    const isValid = validate(uuid);

    if (!isValid) {
      throw new AppError('UUID not is valid');
    }
  }
}

export default ValidateUUIDService;
