import { Types } from 'koa-smart';

import Route from './Route';
import MysqlConnector from '../connectors/MysqlConnector';
import SHA256 from "crypto-js/sha256";
import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class RouteConnect extends Route {
  constructor(params) {
    super({ ...params });
  }

    // post route: http://localhost:3000/connect
  @Route.Post({
    path: '/',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      email: Types.string().regex(/\S+@\S+\.\S+/).required(), // return a 400 if the body doesn't contain email key
      password: Types.string().required(), // password is required
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    const userExistQuery = "SELECT * FROM users WHERE email='" + body.email + "';";
    const password = SHA256(body.password);
    const userExist = await MysqlConnector.sendSyncQuery(userExistQuery);

    console.log(userExist.rows);
    if (userExist.rows[0]) {
      // User exists in database
      if (userExist.rows[0].password != password) {
        this.send(ctx, 401, undefined, 'Invalid email/password combinaison');
      }
      else {
        const cert = fs.readFileSync('./eb8e7350-e32f-4a88-99e9-0af2a977c3f3.private.pem', 'utf8');
        const token = jwt.sign({ userId: userExist.rows[0].id }, cert, { expiresIn: 60 * 60 * 24});

        const saveTokenQuery = "INSERT INTO tokens (userid, token) VALUES (" + userExist.rows[0].id + ", '" + token + "');";
        const tokenSaved = await MysqlConnector.sendSyncQuery(saveTokenQuery);

        this.send(ctx, 200, { token,  }, 'User successfully connected');
      }
    } else {
      // User doesn't exist in database
      this.send(ctx, 404, undefined, 'User not found');
    }
  }  
}