import mysql from 'mysql';

export default class MysqlConnector {
  sendQuery(query, callback) {
    let connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'm }4<^6/[$os=BO',
      database : 'lesbonsbails'
    });
    connection.connect();

    connection.query(query, function (error, results) {
      if (error) throw error;
      callback(error, results);
    });

    connection.end();
  }
}
