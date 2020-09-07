// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import SimpleCRUD from '../../model/SimpleCRUD'

class VerifyAccountController {
  async verifyEmail (req: Request, res: Response) {
    const { email } = req.body

    const { ReadReturnSelectWithWhereFirst } = new SimpleCRUD()

    const mailExists = await ReadReturnSelectWithWhereFirst('users', { email: 'email' }, { email })

    return res.json({ exists: !!mailExists })
  }

  async verifyUserName (req: Request, res: Response) {
    // eslint-disable-next-line camelcase
    const { user_name } = req.body

    const parts = String(user_name).split(' ')

    if (parts.length !== 1) return res.json({ error: 'User name Malformed' })

    const { ReadReturnSelectWithWhereFirst } = new SimpleCRUD()

    const userNameExists = await ReadReturnSelectWithWhereFirst('users', { user_name: 'user_name' }, { user_name })

    return res.json({ exists: !!userNameExists })
  }
}

export default VerifyAccountController
