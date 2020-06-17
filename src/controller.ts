import { AuthModel } from 'zqs-core/lib/auth';
import { IContext } from 'zqs-core/lib/context';
import { IModel, Mongoose, paginate } from 'zqs-core/lib/db';
import { Boom, handleError } from 'zqs-core/lib/errors';
import { response } from 'zqs-core/lib/response';
import { IConfig } from './config';

export class Controller {
    constructor(private model: IModel, private config: IConfig) { }
    // Gets a list of Models
    public index = async (ctx: IContext) => {
        try {
            const paginateResult = await paginate(this.model, ctx);
            response(ctx, 200, paginateResult);
        } catch (e) {
            console.error(e);
            handleError(ctx, e);
        }
    };

    // tougle bookmark
    public tougle = async (ctx: IContext) => {
        try {
            if (!ctx.request.fields) throw Boom.badData(this.config.errors.empty);
            const doc = {
                target: ctx.request.fields.target,
                __auth: ctx.request.auth._id,
                category: ctx.request.fields.category,
            };
            const exists = await this.model.count(doc);
            if (exists) {
                await this.model.remove(doc).exec();
                response(ctx, 204);
            } else {
                const entity = await this.model.create(doc);
                response(ctx, 201, entity);
            }
        } catch (e) {
            handleError(ctx, e);
        }
    };
}