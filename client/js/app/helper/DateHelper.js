'use strict';

class DateHelper {

  static asString(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  static asDate(strDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(strDate)) {
      throw new Error('Data em formato incorreto. Deve estar no formato aaaa-mm-dd.');
    }
    return new Date(...strDate
      .split('-')
      .map(v => parseInt(v))
      .map((v, i) => i === 1 ? v - 1 : v));
  }
}