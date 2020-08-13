import axios from 'axios';
export default axios.create({
  baseURL: 'http://34.68.137.0/api',

  // headers: {'X-Custom-Header': 'foobar'},
});
