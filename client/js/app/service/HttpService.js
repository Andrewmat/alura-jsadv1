'use strict';

class HttpService {
  constructor() {
    throw new Error('HttpService should not be instantiated');
  }

  static get(url) {
    return fetch(url)
      .then(resp => HttpService._handleError(resp))
      .then(resp => resp.json());
  }

  static post(url, data) {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(resp => this._handleError(resp));
  }

  static _handleError(resp) {
    if (resp.ok) {
      return resp;
    }
    throw new Error(resp.statusText);
  }
}