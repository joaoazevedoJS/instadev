// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import SearchPublicationsModel from '../../model/PublicationsModel/SearchPublicationsModel'

class SearchPublicationsControllers {
  public async index (req: Request, res: Response) {
    const { userId } = req.userSession
    const { page, typePublication } = req.query

    const { HomePublications, GlobalPublications } = new SearchPublicationsModel()

    const publications = typePublication === 'Home'
      ? await HomePublications(userId, Number(page))
      : await GlobalPublications(Number(page))

    return res.json(publications)
  }
}

export default new SearchPublicationsControllers()
