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
    let xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', url);
      xhr.onreadystatechange = HttpService._readyStateChangeHandler(xhr, resolve, reject);
      xhr.send();
    });
  }

  static post(url, data) {
    let xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = HttpService._readyStateChangeHandler(xhr, resolve, reject);
      xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
    });
  }
}