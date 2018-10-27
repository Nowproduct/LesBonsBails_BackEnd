import mariadb from 'mariadb';

export default class MysqlConnector {
  static sendQuery(query, arrDataQuery, callback) {
    const pool = mariadb.createPool({
      host: 'localhost',
      user:' root',
      password : '',
      database : 'lesbonsbails_dev',
      connectionLimit: 5
    });
    pool.getConnection()
    .then(conn => {
      if (dataQuery == null) {
        conn.query(query)
        .then((rows) => {
          //handle success
          conn.end();
          callback(undefined, rows);
        })
        .catch(err => {
          //handle error
          conn.end();
          callback(err, undefined);
        })
      } else {
        conn.query(query, arrDataQuery)
        .then((rows) => {
          //handle success
          conn.end();
          callback(undefined, rows);
        })
        .catch(err => {
          //handle error
          conn.end();
          callback(err, undefined);
        })
      }
        
    }).catch(err => {
      //not connected
      callback(err, undefined);
    });

    connection.connect();

    connection.query(query, function (error, results) {
      if (error) throw error;
      callback(error, results);
    });

    connection.end();
  }
}
