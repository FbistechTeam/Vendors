import {useSelector} from 'react-redux';

export const BaseURL = {
  Api: 'http://34.68.137.0/api/',
};

export default () => {
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const HandleRequest = async (URL, type, jsonData) => {
    const request = type;
    //Make a switch case here...
    switch (request) {
      case 'post':
        console.log(jsonData);
        let postResponse = await fetch(BaseURL.Api + URL, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache',
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
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
          },
        });
        return getResponse.json();

      case 'delete':
        console.log(jsonData);
        let deleteResponse = await fetch(BaseURL.Api + URL, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
            body: jsonData,
          },
        });
        return deleteResponse.json();

      default:
        break;
    }
  };
  return [HandleRequest];
};
