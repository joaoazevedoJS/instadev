import crypto from 'crypto';

import IGenerateCode from '@shared/auth/IGenerateCode';

class GenerateCode implements IGenerateCode {
  public random(max: number): string {
    return crypto.randomInt(max).toString();
  }
}

export default GenerateCode;
