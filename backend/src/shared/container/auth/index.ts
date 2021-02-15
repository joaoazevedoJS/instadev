import { container } from 'tsyringe';

import IGenerateCode from '@shared/auth/IGenerateCode';
import GenerateCode from '@shared/infra/auth/GenerateCode';

import IValidateUUID from '@shared/auth/IValidateUUID';
import ValidateUUID from '@shared/infra/auth/ValidateUUID';

container.registerSingleton<IGenerateCode>('GenerateCode', GenerateCode);
container.registerSingleton<IValidateUUID>('ValidateUUID', ValidateUUID);
