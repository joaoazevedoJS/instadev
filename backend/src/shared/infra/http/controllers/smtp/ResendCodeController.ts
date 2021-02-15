import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MailAccountCode from '@shared/smtp/mails/IMailAccountCode';

import SendMailService from '@shared/services/smtp/SendMailService';
import ResendcodeService from '@domain/users/services/mail/ResendcodeService';
import GenerateCodeService from '@shared/services/auth/GenerateCodeService';

class ResendCodeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const sendmail = container.resolve(SendMailService);
    const resendcode = container.resolve(ResendcodeService);
    const generateCode = container.resolve(GenerateCodeService);

    const code = generateCode.execute();

    const user = await resendcode.execute({ user_id: id, code });

    const mailAccountCode = new MailAccountCode({
      email: user.email,
      code: user.verification_code,
    });

    await sendmail.execute(mailAccountCode);

    return response.status(201).json({ message: 'Resend code to mail' });
  }
}

export default ResendCodeController;
