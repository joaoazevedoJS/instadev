import knex from '../database/connection'

class SimpleCRUD {
  protected async Create (table: string, data: any) {
    const createData = await knex(table).insert(data)

    return createData
  }

  public async Read (table: string, where?: any, isFirst?: boolean) {
    let response: any

    if (where && !isFirst) {
      response = await knex(table).where(where).select('*')
    } else if (where && isFirst) {
      response = await knex(table).where(where).first().select('*')
    } else if (!where && isFirst) {
      response = await knex(table).first().select('*')
    } else {
      response = await knex(table).select('*')
    }

    return response
  }

  protected async Update (table: string, data: any, where: any) {
    await knex(table).update(data).where(where)
  }

  protected async Delete (table: string, where: any) {
    await knex(table).where(where).first().delete()
  }
}

export default SimpleCRUD
