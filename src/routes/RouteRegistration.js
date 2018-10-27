import { Types } from 'koa-smart';

import Route from './Route';
import MysqlConnector from '../connectors/MysqlConnector';
import SHA256 from "crypto-js/sha256";

export default class RouteRegistration extends Route {
  constructor(params) {
    super({ ...params });
  }

  // post route: http://localhost:3000/registration
  @Route.Post({
    path: '/',
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
}