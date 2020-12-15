import { Router } from 'express';

// import GetUserWithUsernameService from 'src/services/GetUserWithUsernameService';
// import AcessAccountService from '../services/AcessAccountService';
import SendCodeToMailService from '../services/SendCodeToMailService';
import CreateUserService from '../services/CreateUserService';

import Mailer from '../smtp/mailer';
import Email from '../models/utils/Email';
import Password from '../models/utils/Password';

// import UsersRepositories from '../repositories/UsersRepositories';
// import UsersFollowRepositories from '../repositories/UsersFollowRepositories';

const usersRoutes = Router();

// const usersRepositories = new UsersRepositories();
// const usersFollowRepositories = new UsersFollowRepositories();
const mailer = new Mailer();

usersRoutes.post('/signup', async (request, response) => {
  try {
    const { name, email, user_name, password } = request.body;

    const mail = new Email(email);
    const pass = new Password(password);

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      mail,
      password: pass,
      user_name,
      name,
    });

    const sendCodeToMail = new SendCodeToMailService(mailer);

    await sendCodeToMail.execute({ mail, code: user.verification_code });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// usersRoutes.post('/signin', async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     const acessAccount = new AcessAccountService(usersRepositories);

//     const token = await acessAccount.execute({ email, password });

//     return response.json({ token });
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

// usersRoutes.get('/:user_name', async (request, response) => {
//   const { user_name } = request.params;

//   const getUserWithUsername = new GetUserWithUsernameService(usersRepositories);

//   const user = await getUserWithUsername.execute(user_name);

//   const follows = await usersFollowRepositories.getCountFollowsByUser(user.id);

//   return response.json({ user, follows });
// });

export default usersRoutes;
