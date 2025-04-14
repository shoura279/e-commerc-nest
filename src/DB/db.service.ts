import {
  FilterQuery,
  Model,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  SortOrder,
} from 'mongoose';

interface IFindMany<T> {
  filter?: FilterQuery<T>;
  populate?: PopulateOptions[];
  select?: string;
  sort?: { [key: string]: SortOrder };
  limit?: number;
  skip?: number;
}

export abstract class DBService<T> {
  constructor(private readonly model: Model<T>) {}

  create(document: Partial<T>): Promise<T> {
    return this.model.create(document);
  }

  async find({
    filter = {},
    populate = [],
    select = '',
    sort,
    limit = 10,
    skip = 0,
  }: IFindMany<T>) {
    const query = this.model.find(filter);
    if(populate.length) query.populate(populate);
    if(select) query.select(select);
    if(sort) query.sort(sort);
    if(limit) query.limit(limit);
    if(skip) query.skip(skip);
    const result = await query;
    return result;
  }

  findOne(
    filter?: FilterQuery<T>,
    populate?: PopulateOptions[],
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    // if (filter?._id) return this.model.findById(filter, projection, options); // db.findOne() >> mongodb native
    return this.model.findOne(filter, projection, options).populate(populate || []);
  }

  deleteMany(filter: FilterQuery<T>) {
    return this.model.deleteMany(filter);
  }
}
