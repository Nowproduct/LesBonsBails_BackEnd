import { Types } from 'koa-smart';
import Route from './Route';
import MysqlConnector from './../connectors/MysqlConnector';
import GrantAccess from './../Utils/GrantAccess';

export default class RouteMe extends Route {
  constructor(params) {
    super({ ...params });
  }

  // get route: http://localhost:3000/me/profile
  @Route.Get({
    path: '/profile', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
  })
  async getMyProfile(ctx) {
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const userExistQuery = "SELECT * FROM users WHERE id=" + result.userId + ";";
      const getProfileResult = await MysqlConnector.sendSyncQuery(userExistQuery);
      let userProfile = getProfileResult.rows[0];
      userProfile.password = "";
      if (!userProfile) {
        console.log("User " + ctx.params.id + " not found");
        this.send(ctx, 404, undefined, 'User not found');
      } else {
        console.log(userProfile);
        this.send(ctx, 200, userProfile, 'Success');
      }
    }
  }

  // get route: http://localhost:3000/me/profile
  @Route.Put({
    path: '/profile', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
    bodyType: Types.object().keys({
        // params to allow: all other params will be rejected
        email: Types.string().regex(/\S+@\S+\.\S+/), // return a 400 if the body doesn't contain email key
        username: Types.string(), // username is required
        firstname: Types.string(), // firstName is optional
        lastname: Types.string(), // lastName is optional
      }),
    })
  async editMyProfile(ctx) {
    const body = this.body(ctx); // or ctx.request.body
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const editUserQuery = "UPDATE users SET "
      + (body.email ? "email = '" + body.email + ((body.username || body.firstname || body.lastname) ? "', " : "'") : "")
      + (body.username ? "username = '" + body.username + ((body.firstname || body.lastname) ? "', " : "'") : "")
      + (body.firstname ? "firstname = '" + body.firstname + ((body.lastname) ? "', " : "'") : "")
      + (body.lastname ? "lastname = '" + body.lastname + "'" : "")
      + " WHERE id=" + result.userId + ";";
      console.log("Mysql query: " + editUserQuery);
      const getProfileResult = await MysqlConnector.sendSyncQuery(editUserQuery);
      console.log(getProfileResult);
      this.send(ctx, 200, undefined, 'Success');
    }
  }
}