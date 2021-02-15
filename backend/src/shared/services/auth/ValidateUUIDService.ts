import { inject, injectable } from 'tsyringe';

import IValidateUUID from '@shared/auth/IValidateUUID';

import AppError from '@shared/errors/AppError';

@injectable()
class ValidateUUIDService {
  constructor(
    @inject('ValidateUUID')
    private validateUUID: IValidateUUID,
  ) {}

  public execute(uuid: string): void {
    const isValid = this.validateUUID.validate(uuid);

    if (!isValid) {
      throw new AppError('Invalid user identification');
    }
  }
}

export default ValidateUUIDService;
