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
/*
  // get route: http://localhost:3000/user/:id
  @Route.Get({
    path: '/:id', // as we defined a segment in the path (:id), the value entered in the url will be available as ctx.params.id
  })
  async get(ctx) {
    this.sendOk(ctx, ctx.params.id); // we simply return the parameter
  }
  */
}