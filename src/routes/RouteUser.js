import Route from './Route';
import MysqlConnector from './../connectors/MysqlConnector';
import GrantAccess from './../Utils/GrantAccess';

export default class RouteUser extends Route {
  constructor(params) {
    super({ ...params });
  }

  // get route: http://localhost:3000/user/:id
  @Route.Get({
    path: '/:id', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
  })
  async getUser(ctx) {
    const result = await GrantAccess.isConnected(ctx.request.header);
    if (result.isAuth == false) {
      this.send(ctx, 401, undefined, 'Invalid token');
    } else {
      const userExistQuery = "SELECT * FROM users WHERE id=" + ctx.params.id + ";";
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
}