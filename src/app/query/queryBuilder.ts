import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const search = this.query?.search
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }

    return this
  }
  filter() {
    const queryObj = { ...this.query }
    const excludedFields = [
      'search',
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'fields',
    ]
    excludedFields.forEach((el) => delete queryObj[el])
    if (queryObj.filter) {
      const filterValue = queryObj.filter
      queryObj['author'] = filterValue
      delete queryObj.filter
    }

    this.modelQuery = this.modelQuery.find(queryObj)

    return this
  }
  sort() {
    let sortStr
    if (this.query?.sortBy && this.query?.sortOrder) {
      const sortBy = this.query.sortBy
      const sortOrder = this.query.sortOrder
      if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        return this.modelQuery
      }
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
    } else {
      sortStr = '-createdAt'
    }
    if (sortStr) {
      this.modelQuery = this.modelQuery.sort(sortStr)
    }
    return this
  }

  exec() {
    return this.modelQuery.exec()
  }
}

export default QueryBuilder
