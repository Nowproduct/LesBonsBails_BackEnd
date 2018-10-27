import { Types } from 'koa-smart';

import Route from './Route';
import MysqlConnector from './../connectors/MysqlConnector';
import SHA256 from "crypto-js/sha256";
import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class RouteUser extends Route {
  constructor(params) {
    super({ ...params });
  }

  // get route: http://localhost:3000/user/:id
  @Route.Get({
    path: '/:id', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
  })
  async get(ctx) {
    this.sendOk(ctx, ctx.params.id); // we simply return the parameter
  }

  // post route: http://localhost:3000/user/registration
  @Route.Post({
    path: '/registration',
    bodyType: Types.object().keys({
      // params to allow: all other params will be rejected
      email: Types.string().regex(/\S+@\S+\.\S+/).required(), // return a 400 if the body doesn't contain email key
      password: Types.string().required(), // password is required
      username: Types.string().required(), // username is required
      firstName: Types.string(), // firstName is optional
      lastName: Types.string(), // lastName is optional
    }),
  })
  async add(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    const userExistQuery = "SELECT * FROM users WHERE username='" + body.username + "' OR email='" + body.email + "';";

    // Checking if username or email exist in database
    let userExist = await MysqlConnector.sendSyncQuery(userExistQuery); 
    console.log(userExist.rows);
    if (userExist.rows[0]) {
      // User already exist in database
      this.send(ctx, 400, undefined, 'User already exist with this email or username');
    } else {
      // User doesn't exist in database

      const password = SHA256(body.password);
      console.log("Password generated: " + password);

      const query = "INSERT INTO users (username, email, password, firstname, lastname, receiverpaypalid) VALUES ( "
      + "'" + body.username + "'," + "'" + body.email + "'," + "'" + password + "'," + "'" + (body.firstName ? body.firstName : "")
      + "'," + "'" + (body.lastName ? body.lastName : "") + "'," + " NULL);";

      let result = await MysqlConnector.sendSyncQuery(query);
      console.log(result);
      this.send(ctx, 201, undefined, 'User successfully created');
    }
  }


    // post route: http://localhost:3000/user/connect
  @Route.Post({
    path: '/connect',
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
        const token = jwt.sign({ userId: userExist.rows[0].id }, cert, { expiresIn: 60 * 60 * 24, algorithm: 'RS256'});
        console.log('Token generated: ' + token);

        const saveTokenQuery = "INSERT INTO tokens (userid, token) VALUES (" + userExist.rows[0].id + ", '" + token + "');";
        const tokenSaved = await MysqlConnector.sendSyncQuery(saveTokenQuery);
        console.log('Token saved: ', tokenSaved);

        this.send(ctx, 200, { token,  }, 'User successfully connected');
      }
    } else {
      // User doesn't exist in database
      this.send(ctx, 404, undefined, 'User not found');
    }
  }  
}