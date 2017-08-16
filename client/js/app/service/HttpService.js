'use strict';

class HttpService {

  constructor() {
    throw new Error('HttpService should not be instantiated');
  }

  static _readyStateChangeHandler(xhr, resolve, reject) {
    return () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
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
    // let xhr = new XMLHttpRequest();
    // return new Promise((resolve, reject) => {
    //   xhr.open('POST', url);
    //   xhr.setRequestHeader('Content-Type', 'application/json');
    //   xhr.onreadystatechange = HttpService._readyStateChangeHandler(xhr, resolve, reject);
    //   xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
    // });
  }

  static _handleError(resp) {
    if (resp.ok) {
      return resp;
    }
    throw new Error(resp.statusText);
  }
}