import { Router } from 'express';

import AcessAccountService from '../services/AcessAccountService';
import SendMailService from '../services/SendMailService';
import CreateUserService from '../services/CreateUserService';

import Email from '../models/utils/Email';
import Password from '../models/utils/Password';
import MailAccountCode from '../models/smtp/MailAccountCode';

const sessionsRoutes = Router();

sessionsRoutes.post('/signup', async (request, response) => {
  try {
    const { name, email, user_name, password } = request.body;

    const mail = new Email(email);
    const pass = new Password(password);

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email: mail.email,
      password: pass,
      user_name,
      name,
    });

    const sendMail = new SendMailService();

    const mailAccount = new MailAccountCode({
      mail,
      code: user.verification_code,
    });

    sendMail.execute(mailAccount);

    const userWithoutPassword = { ...user, password: undefined };

    return response.json({ user: userWithoutPassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

sessionsRoutes.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;

    const acessAccount = new AcessAccountService();

    const { token, user } = await acessAccount.execute({ email, password });

    const userWithoutPassword = { ...user, password: undefined };

    return response.json({ token, user: userWithoutPassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRoutes;
