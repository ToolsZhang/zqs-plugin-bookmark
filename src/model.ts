import { IModel, Model, Schema } from 'zqs-core/lib/db';
import { IConfig } from './config';

export function createModel(config: IConfig): IModel {
  const schema = new Schema(
    {
      category: {
        type: String,
        enum: config.categories,
        required: true,
      },
      target: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: {},
    }
  );
  return Model({
    name: '__bookmark',
    auth: true,
    schema,
  });
}
