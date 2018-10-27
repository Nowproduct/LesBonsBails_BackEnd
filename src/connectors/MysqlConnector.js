import mysql from 'mysql2/promise';
import config from '../../databaseConfig';

export default class MysqlConnector {
  static async sendSyncQuery(query) {
      const connection = await mysql.createConnection(config.dev);
  
      const [rows, fields] = await connection.execute(query);
  
      connection.end();
      return ({
        rows,
        fields
      });
  }
}
