import { Request, Response } from 'express'

import SearchPublicationsModel from '../../model/PublicationsModel/SearchPublicationsModel'

class SearchPublicationsControllers {
  private _model = (page: number, order?: string) => new SearchPublicationsModel(page, order)

  public index = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { page, typePublication, order } = req.query

    const model = this._model(Number(page), String(order))

    const publications = typePublication === 'Home'
      ? await model.HomePublications(userId)
      : await model.GlobalPublications()

    return res.json(publications)
  }
}

export default new SearchPublicationsControllers()
