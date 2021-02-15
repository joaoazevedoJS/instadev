import IValidateUUID from '@shared/auth/IValidateUUID';
import { validate } from 'uuid';

class ValidateUUID implements IValidateUUID {
  public validate(uuid: string): boolean {
    const isUUID = validate(uuid);

    return isUUID;
  }
}

export default ValidateUUID;
