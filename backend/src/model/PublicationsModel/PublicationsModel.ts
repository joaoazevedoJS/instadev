import knex from '../../database/connection'

import { ICreatePublication, IPublications, IWherePublications } from '../../interfaces/IPublications'

import SimpleCRUD from '../SimpleCRUD'
import DeletePublicationsModel from './DeletePublicationsModel'

class PublicationsModel extends SimpleCRUD {
  private _deletePublicationsModel = new DeletePublicationsModel()

  constructor () { super('publications') }

  public CreateUserPublication = async (data: ICreatePublication) => {
    const id = await this.Create(data)

    return id[0]
  }

  public SearchPublication = async (where: IWherePublications) => {
    const publication: IPublications = await this.ReadWithWhereFirst(where)

    return publication
  }

  public existsPublication = async (id: number) => {
    const publication: IPublications = await this.ReadWithWhereFirst({ id })

    return publication
  }

  public DeleteUserPublication = async (where: IWherePublications) => {
    await this._deletePublicationsModel.DeleteUserPublication(where)
  }

  public UpdateUserPublication = async (data: object, where: IWherePublications) => {
    await this.Update(data, where)
  }
}

export default PublicationsModel
