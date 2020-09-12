// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

class WebAuthController {
  authenticated (req: Request, res: Response) {
    // if token is true
    res.send('')
  }
}

export default new WebAuthController()
