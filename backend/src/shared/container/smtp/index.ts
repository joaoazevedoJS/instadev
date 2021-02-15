import { container } from 'tsyringe';

import IMailer from '@shared/smtp/IMailer';
import Mailer from '@shared/infra/smtp';

container.registerSingleton<IMailer>('Mailer', Mailer);
