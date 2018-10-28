import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class GrantAccess {
  static async isConnected(header) {

    if (!header.authorization) {
        return ({
            isAuth: false
        });
    }

    const cert = fs.readFileSync('./eb8e7350-e32f-4a88-99e9-0af2a977c3f3.private.pem', 'utf8');
    try {
        const decoded = jwt.verify(header.authorization.split(' ')[1], cert);
//        console.log(decoded);
        return ({
            isAuth: true,
            userId: decoded.userId
        });
    }
    catch(error) {
//        console.log(error);
        return ({
            isAuth: false
        });
    }
  }
}
