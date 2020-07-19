export default class Api {
  static get endPoint() {
    return 'https://louonsapptest.herokuapp.com/louons/api/v1';
    // return 'http://localhost:5000/louons/api/v1';
  }

  static get endPointImage() {
    return 'https://louonsapptest.herokuapp.com/uploads/img';
    // return 'http://localhost:5000/uploads/img';
  }
}