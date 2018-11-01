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
      name: Types.string().required(), // return a 400 if the body doesn't contain name key
      type: Types.string().required(), // password is optional
      description: Types.string(), // description is optional
      price: Types.string().required(), // price is optional
      pictureurl: Types.array(), // pictureurl is optional
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
      const itemExistQuery = "SELECT * FROM items WHERE state != 0 ORDER BY publishDate DESC LIMIT " + (body.limit * (body.page - 1)) + "," + body.limit + ";";
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

  // get route: http://localhost:3000/articles/recent
  @Route.Post({
    path: '/search', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
    bodyType: Types.object().keys({
      limit: Types.number().integer().required().default(10),
      page: Types.number().integer().required().default(1),
      keywords: Types.string(), // keywords is optional
      type: Types.string(), // keywords is optional
    }),
  })
  async searchArticles(ctx) {
    const body = this.body(ctx);
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      console.log(body);

      let keywordsParsed = "";
      if (body.keywords) {
        let arr =  body.keywords.split(' ');
        for (var i = 0; i < arr.length; i++) {
          keywordsParsed += ( (i > 0 ? " " : "") + "%" + arr[i] + "%" );
        }
        console.log("Keywords parsed: " + keywordsParsed);
      }

      const itemExistQuery = "SELECT * FROM items"
        + (keywordsParsed == "" ? "" : (
          " WHERE state != 0 AND ( name LIKE "
          + "\"" + keywordsParsed + "\""
          + " OR description LIKE "
          + "\"" + keywordsParsed + "\")" ))
        + (body.type ? (keywordsParsed == "" ? " WHERE state != 0 AND type=\"" + body.type + "\"" : " AND type=\"" + body.type + "\"") : "")
        + (keywordsParsed == "" || !body.type ? " WHERE state != 0" : "") + " ORDER BY publishDate DESC LIMIT "
        + (body.limit * (body.page - 1)) + "," + body.limit + ";";

      console.log(itemExistQuery);
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

  // put route: http://localhost:3000/articles/:id
  @Route.Put({
    path: '/:id',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      name: Types.string(), // password is optional
      type: Types.string(), // password is optional
      description: Types.string(), // password is optional
      price: Types.number().integer(), // password is optional
    }),
  })
  async editArticle(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const editArticleQuery = "UPDATE items SET "
      + (body.name ? "name = '" + body.name + ((body.type || body.description || body.price) ? "', " : "'") : "")
      + (body.type ? "type = '" + body.type + "', " : "")
      + (body.description ? "description = '" + body.description + "', " : "")
      + (body.price ? "price = '" + body.price + "'," : "")
      + " publishDate = NOW(), edited = 1 WHERE id=" + ctx.params.id + ";";
      console.log("Mysql query: " + editArticleQuery);
      const editArticleResult = await MysqlConnector.sendSyncQuery(editArticleQuery);
      console.log(editArticleResult);
      this.send(ctx, 200, undefined, 'Success');
    }
  }

  // post route: http://localhost:3000/articles
  @Route.Delete({
    path: '/:id',
  })
  async add(ctx) {
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const query = "UPDATE items SET state = 0 WHERE id=" + ctx.params.id + ";";
      const cancelArticleResult = await MysqlConnector.sendSyncQuery(query);
      console.log(cancelArticleResult);
      this.send(ctx, 200, undefined, 'Success');
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
  */
}
