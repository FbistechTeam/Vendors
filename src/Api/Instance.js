// import axios from 'axios';
// export default axios.create({
//   baseURL: 'http://35.178.37.45:5000/',
// });
import axios from 'axios';
export default axios.create({
  baseURL: 'http://34.68.137.0/api',
  timeout: 4000,
  maxContentLength: 100000000,
  maxBodyLength: 1000000000,
  // headers: {'X-Custom-Header': 'foobar'},
});
