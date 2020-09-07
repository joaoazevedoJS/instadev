import knex from '../database/connection'

class SimpleCRUD {
  protected async Create (table: string, data: any) {
    const createData = await knex(table).insert(data)

    return createData
  }

  public async Read (table: string) {
    return await knex(table).select('*')
  }

  public async ReadFirst (table: string) {
    return await knex(table).select('*').first()
  }

  public async ReadWithWhere (table: string, where: object) {
    return await knex(table).where(where).select('*')
  }

  public async ReadWithWhereFirst (table: string, where: object) {
    return await knex(table).where(where).select('*').first()
  }

  public async ReadReturnSelect (table: string, select: object) {
    return await knex(table).select(select)
  }

  public async ReadReturnSelectWithWhere (table: string, select: object, where: object) {
    return await knex(table).select(select).where(where)
  }

  public async ReadReturnSelectWithWhereFirst (table: string, select: object, where: object) {
    return await knex(table).select(select).where(where).first()
  }

  protected async Update (table: string, data: object, where: object) {
    await knex(table).update(data).where(where)
  }

  protected async Delete (table: string, where: object) {
    await knex(table).where(where).first().delete()
  }
}

export default SimpleCRUD
