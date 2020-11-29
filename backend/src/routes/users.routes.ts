import { Router } from 'express';

import AcessAccountService from '../services/AcessAccountService';
import SendCodeToMailService from '../services/SendCodeToMailService';
import CreateUserService from '../services/CreateUserService';

import Mailer from '../smtp/mailer';
import Email from '../models/Email';
import Password from '../models/Password';

import UsersRepositories from '../repositories/UsersRepositories';

const usersRoutes = Router();
const usersRepositories = new UsersRepositories();
const mailer = new Mailer();

usersRoutes.post('/signup', async (request, response) => {
  try {
    const { name, email, user_name, password } = request.body;

    const mail = new Email(email);
    const pass = new Password(password);

    const createUser = new CreateUserService(usersRepositories);

    const user = await createUser.execute({
      mail,
      password: pass,
      user_name,
      name,
    });

    const sendCodeToMail = new SendCodeToMailService(mailer);

    await sendCodeToMail.execute({ mail, code: user.accountCode });

    response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRoutes.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;

    const acessAccount = new AcessAccountService(usersRepositories);

    const token = await acessAccount.execute({ email, password });

    return response.json({ token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
