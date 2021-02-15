import { inject, injectable } from 'tsyringe';

import IGenerateCode from '@shared/auth/IGenerateCode';

@injectable()
class GenerateCodeService {
  constructor(
    @inject('GenerateCode')
    private generateCode: IGenerateCode,
  ) {}

  public execute(lenght = 6): string {
    let code = '';

    for (let i = 0; i < lenght; i += 1) {
      code += this.generateCode.random(10);
    }

    return code;
  }
}

export default GenerateCodeService;
