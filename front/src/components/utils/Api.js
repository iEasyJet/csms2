class Api {
  constructor(config) {
    this.url = config.url;
  }

  // Анализирование ответа
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(
        `Произошла ошибка! Код ошибки: ${res.status}. Сообщение: ${res.message}`
      )
    );
  }

  checkConnect(dataForConnect) {
    return fetch(`${this.url}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: dataForConnect.user,
        password: dataForConnect.password,
        database: dataForConnect.database,
        host: dataForConnect.host,
        typeDB: dataForConnect.type,
      }),
    }).then((res) => this._parseResponse(res));
  }

  createTable(dataForConnect, query) {
    return fetch(`${this.url}/createTable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: dataForConnect.user,
        password: dataForConnect.password,
        database: dataForConnect.database,
        host: dataForConnect.host,
        typeDB: dataForConnect.type,
        query: query,
      }),
    }).then((res) => this._parseResponse(res));
  }

  insertData(dataForConnect, query) {
    return fetch(`${this.url}/insertData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: dataForConnect.user,
        password: dataForConnect.password,
        database: dataForConnect.database,
        host: dataForConnect.host,
        typeDB: dataForConnect.type,
        query: query,
      }),
    }).then((res) => this._parseResponse(res));
  }

  uploadFile(file) {
    return fetch(`${this.url}/upload`, {
      method: 'POST',
/*       headers: {
        'Content-Type': 'multipart/form-data',
      }, */
      body: file,
    }).then((res) => this._parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
  }
}



const config = {
  /* url: 'http://10.0.0.96:3001', */
  url: 'http://localhost:3001'
};

const api = new Api(config);

export default api;
