import { Router } from 'express';

import Authorization from '../middlewares/Authorization';
import MailAccountCode from '../models/smtp/MailAccountCode';
import Email from '../models/utils/Email';
import ResendcodeService from '../services/MailsService/ResendcodeService';
import SendMailService from '../services/MailsService/SendMailService';

const mailsRoutes = Router();

mailsRoutes.post('/resendcode', Authorization, async (request, response) => {
  const { id } = request.user;

  const sendmail = new SendMailService();
  const resendcode = new ResendcodeService();

  const user = await resendcode.execute(id);

  const mail = new Email(user.email);

  const mailAccountCode = new MailAccountCode({
    mail,
    code: user.verification_code,
  });

  await sendmail.execute(mailAccountCode);

  return response.status(201).json({ message: 'Resend code to mail' });
});

export default mailsRoutes;
