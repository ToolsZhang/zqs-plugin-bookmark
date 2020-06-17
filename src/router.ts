import { Zqs } from 'zqs-core';
import { Router } from 'zqs-core/lib/routers';
import { IConfig } from './config';
import { Controller } from './controller';
import { createModel } from './model';

export async function setupRouter(app: Zqs): Promise<Router[]> {
  const config: IConfig = app.config.bookmark;
  const routers: Router[] = [];
  const model = createModel(config);
  const controller = new Controller(model, config);
  routers.push(
    model.routes(
      config.endpoint,
      {
        path: '/',
        methods: ['get'],
        controller: controller.index,
        tags: ['__bookmark'],
        summary: 'List documents',
        description: 'List documents',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [model.docSchema.paginateOptions],
        responses: {
          200: {
            description: 'Successful operation',
            schema: model.docSchema.paginateResultWithOptions({
              exclude: '_id',
            }),
          },
          '4xx': model.docSchema.response4xx,
          '5xx': model.docSchema.response5xx,
        },
      },
      {
        path: '/',
        methods: ['post'],
        controller: controller.tougle,
        auth: {
          type: 'isAuthenticated',
        },
        tags: ['__bookmark'],
        summary: 'Tougle bookmark',
        description: `Tougle bookmark`,
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [model.docSchema.body],
        responses: {
          201: {
            description: 'Bookmark added',
            schema: model.docSchema.result,
          },
          204: {
            description: 'Bookmark removed',
          },
          '4xx': model.docSchema.response4xx,
          '5xx': model.docSchema.response5xx,
        },
      }
    )
  );

  return routers;
}
