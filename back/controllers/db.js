const pg = require('pg');
const sql = require('mssql');
const multer = require('multer');

const checkConnection = (req, res, next) => {
  const { user, password, host, database, typeDB } = req.body;
  const port = 5432;

  if (typeDB === 'pg') {
    const db = new pg.Pool({
      user,
      password,
      host,
      port,
      database,
    });

    db.connect((err, client, done) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      } else {
        client.query('Select 1', [], function (err, result) {
          done();
          if (err) {
            next(`Ошибка выполнения запроса к БД: ${err}`);
          }
          res.send(result.rows);
        });
      }
    });

    db.on('error', function (err, client) {
      next(`Ошибка простоя клиента: ${err.message}, ${err.stack}`);
    });
  } else {
    const config = {
      user: user,
      password: password,
      server: host,
      database: database,
      options: {
        encrypt: false,
      },
    };
    sql.connect(config, (err) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      } else {
        new sql.Request().query('Select 1', (err, result) => {
          if (err) {
            next(`Ошибка выполнения запроса к БД: ${err}`);
          } else {
            result.recordset === undefined
              ? res.send(JSON.stringify('Yes!'))
              : res.send(result.recordset);
          }
        });
      }
    });
  }
};

const createTable = (req, res, next) => {
  const { user, password, host, database, typeDB, query } = req.body;
  const port = 5432;

  if (typeDB === 'pg') {
    const db = new pg.Pool({
      user,
      password,
      host,
      port,
      database,
    });

    db.connect((err, client, done) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      }

      client.query(query, [], function (err, result) {
        done();
        if (err) {
          next(`Ошибка выполнения запроса к БД: ${err}`);
        }
        res.send(result.rows);
      });
    });

    db.on('error', function (err, client) {
      next(`Ошибка простоя клиента: ${err.message}, ${err.stack}`);
    });
  } else {
    const config = {
      user: user,
      password: password,
      server: host,
      database: database,
      options: {
        encrypt: false,
      },
    };
    sql.connect(config, (err) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      }
      new sql.Request().query(query, (err, result) => {
        if (err) {
          next(`Ошибка выполнения запроса к БД: ${err}`);
        } else {
          result.recordset === undefined
            ? res.send(JSON.stringify('Yes!'))
            : res.send(result.recordset);
        }
      });
    });
  }
};

const insertData = (req, res, next) => {
  const { user, password, host, database, typeDB, query } = req.body;
  const port = 5432;

  if (typeDB === 'pg') {
    const db = new pg.Pool({
      user,
      password,
      host,
      port,
      database,
    });

    db.connect((err, client, done) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      }

      client.query(query, [], function (err, result) {
        done();
        if (err) {
          next(`Ошибка выполнения запроса к БД: ${err}`);
        }
        res.send(result.rows);
      });
    });

    db.on('error', function (err, client) {
      next(`Ошибка простоя клиента: ${err.message}, ${err.stack}`);
    });
  } else {
    const config = {
      user: user,
      password: password,
      server: host,
      database: database,
      options: {
        encrypt: false,
      },
    };
    sql.connect(config, (err) => {
      if (err) {
        next(`Ошибка подключения к БД: ${err}`);
      }
      new sql.Request().query(query, (err, result) => {
        if (err) {
          next(`Ошибка выполнения запроса к БД: ${err}`);
        } else {
          result.recordset === undefined
            ? res.send(JSON.stringify('Yes!'))
            : res.send(result.recordset);
        }
      });
    });
  }
};

const uploadFile = (req, res, next) => {

  console.log(req.files);
  if (req.files && req.files.file) {
    let uploadedFile = req.files.file;
    uploadedFile.mv(__dirname + '/uploads/' + uploadedFile.name, (err) => {
        if (err) {
          next(`Ошибка загрузки файла: ${err}`);
        }
        res.send('Файл успешно загружен на сервер');
        console.log('Файл успешно загружен на сервер');
    });
} else {
    res.status(400).send('Файл не найден');
}
}


module.exports = {
  checkConnection,
  createTable,
  insertData,
  uploadFile
};