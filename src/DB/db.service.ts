import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

export abstract class DBService<T> {
  constructor(private readonly model: Model<T>) {}

  create(document: Partial<T>): Promise<T> {
    return this.model.create(document);
  }

  find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.find(filter || {}, projection, options);
  }

  findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    // if (filter?._id) return this.model.findById(filter, projection, options); // db.findOne() >> mongodb native
    return this.model.findOne(filter, projection, options);
  }
}
