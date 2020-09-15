import knex from '../../database/connection'
import { ICreatePublication, IPublications, IWherePublications } from '../../interfaces/IPublications'

import SimpleCRUD from '../SimpleCRUD'

class PublicationsModel extends SimpleCRUD {
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
    await this.Delete(where)
  }
}

export default PublicationsModel
