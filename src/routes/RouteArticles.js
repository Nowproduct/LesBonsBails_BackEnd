import { Types } from 'koa-smart';

import Route from './Route';
import MysqlConnector from './../connectors/MysqlConnector';
import GrantAccess from './../Utils/GrantAccess';

export default class RouteArticles extends Route {
  constructor(params) {
    super({ ...params });
  }

  // get route: http://localhost:3000/articles/:id
  @Route.Get({
    path: '/:id', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
  })
  async getArticle(ctx) {
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const itemExistQuery = "SELECT * FROM items WHERE id=" + ctx.params.id + ";";
      const getItemResult = await MysqlConnector.sendSyncQuery(itemExistQuery);
      let item = getItemResult.rows[0];
      if (!item) {
        console.log("User " + ctx.params.id + " not found");
        this.send(ctx, 404, undefined, 'User not found');
      } else {
        console.log(item);
        this.send(ctx, 200, item, 'Success');
      }
    }
  }

  // post route: http://localhost:3000/articles
  @Route.Post({
    path: '/',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      name: Types.string().required(), // return a 400 if the body doesn't contain email key
      type: Types.string().required(), // password is optional
      description: Types.string(), // password is optional
      price: Types.string().required(), // password is optional
      pictureurl: Types.array(), // password is optional
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    const result = await GrantAccess.isConnected(ctx.request.header);
    const currentDateTime = new Date().toLocaleString('fr-FR');
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const query = "INSERT INTO items (name, type, description, price, publishDate, sellerid) VALUES ( "
      + "'" + body.name + "'," + "'" + body.type + "'," + "'" + (body.description ? body.description : "") + "'," + "'" + body.price
      + "', " + "NOW() ," + result.userId + ");";
      const createItemResult = await MysqlConnector.sendSyncQuery(query);
      console.log(createItemResult);
    // body can contain only an object with email and password field
      this.sendCreated(ctx, body); // helper function which sets the status to 201 and return the parameter
    }
  }

  // get route: http://localhost:3000/articles/recent
  @Route.Post({
    path: '/recent', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
    bodyType: Types.object().keys({
      limit: Types.number().integer().required().default(10),
      page: Types.number().integer().required().default(1),
    }),
  })
  async getRecentArticle(ctx) {
    const body = this.body(ctx);
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      console.log(body);
      const itemExistQuery = "SELECT * FROM items ORDER BY publishDate DESC LIMIT " + (body.limit * (body.page - 1)) + "," + body.limit + ";";
      const getItemResult = await MysqlConnector.sendSyncQuery(itemExistQuery);
      let item = getItemResult.rows;
      if (!getItemResult.rows[0]) {
        this.send(ctx, 404, undefined, 'No articles found');
      } else {
        console.log(item);
        this.send(ctx, 200, item, 'Success');
      }
    }
  }

  /*
  // post route: http://localhost:3000/articles
  @Route.Post({
    path: '',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      email: Types.string().required(), // return a 400 if the body doesn't contain email key
      password: Types.string(), // password is optional
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    // body can contain only an object with email and password field
    this.sendCreated(ctx, body); // helper function which sets the status to 201 and return the parameter
  }

  // post route: http://localhost:3000/articles
  @Route.Post({
    path: '',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      email: Types.string().required(), // return a 400 if the body doesn't contain email key
      password: Types.string(), // password is optional
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    // body can contain only an object with email and password field
    this.sendCreated(ctx, body); // helper function which sets the status to 201 and return the parameter
  }

  // post route: http://localhost:3000/articles
  @Route.Post({
    path: '',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      email: Types.string().required(), // return a 400 if the body doesn't contain email key
      password: Types.string(), // password is optional
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    // body can contain only an object with email and password field
    this.sendCreated(ctx, body); // helper function which sets the status to 201 and return the parameter
  }
  */
}
