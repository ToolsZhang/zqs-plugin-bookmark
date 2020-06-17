import { Zqs } from 'zqs-core';
import { Router } from 'zqs-core/lib/routers';
import * as colors from 'colors/safe';
import * as moment from 'moment';
import { setupRouter } from './router';

export const setup = {
  async pre(app: Zqs): Promise<Router[]> {
    console.log(
      `[${colors.green(
        moment().format('YY-MM-DD HH:mm:ss')
      )}] Setup plugin ${colors.cyan('bookmark')}`
    );
    try {
      const configPath = app.dir + '/plugins/bookmark';
      app.config.bookmark = require(configPath)[process.env.NODE_ENV];
      const routers = await setupRouter(app);
      return await routers;
    } catch (e) {
      console.error(e);
    }
  },
};
