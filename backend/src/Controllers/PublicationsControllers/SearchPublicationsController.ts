// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import SearchPublicationsModel from '../../model/PublicationsModel/SearchPublicationsModel'

class SearchPublicationsControllers extends SearchPublicationsModel {
  async index (req: Request, res: Response) {
    const { userId } = req.userSession
    const { page, typePublication } = req.query

    let publications: any

    if (typePublication === 'Home') {
      publications = await super.HomePublications(Number(userId), Number(page))
    } else {
      publications = await super.GlobalPublications(Number(page))
    }

    return res.json(publications)
  }
}

export default SearchPublicationsControllers
