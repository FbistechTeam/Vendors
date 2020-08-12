// import axios from 'axios';
// export default axios.create({
//   baseURL: 'http://35.178.37.45:5000/',
// });
// import axios from 'axios';
// export default axios.create({
//   baseURL: 'http://34.68.137.0/api',
//   timeout: 4000,
//   maxContentLength: 100000000,
//   maxBodyLength: 1000000000,
//   // headers: {'X-Custom-Header': 'foobar'},
// });
export const BaseURL = {
  Api: 'http://34.68.137.0/api/',
};

export const HandleAllRequest = async (URL, type, access_token, jsonData) => {
  const request = type;
  //Make a switch case here...
  switch (request) {
    case 'post':
      let postResponse = await fetch(BaseURL.Api + URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
          'retry-after': 3600,
        },
        body: JSON.stringify(jsonData),
      });
      return postResponse.json();
    case 'put':
      let putResponse = await fetch(BaseURL.Api + URL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
          'retry-after': 3600,
        },
        body: JSON.stringify(jsonData),
      });
      return putResponse.json();

    case 'get':
      let getResponse = await fetch(BaseURL.Api + URL, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
          'retry-after': 3600,
        },
      });
      return getResponse.json();

    case 'delete':
      console.log(jsonData);
      let deleteResponse = await fetch(BaseURL.Api + URL, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'retry-after': 3600,
          Authorization: `Bearer ${access_token}`,
          body: jsonData,
        },
      });
      return deleteResponse.json();

    default:
      break;
  }
};
