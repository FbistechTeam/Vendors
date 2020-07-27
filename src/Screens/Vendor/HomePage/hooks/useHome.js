import {useEffect, useState} from 'react';
import Instance from '../../../../Api/Instance';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default () => {
  const [materials, setMaterials] = useState([]);
  const [ongoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const options = {};
  const [errorMessage, setErrorMessage] = useState('');

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const reload = () => {
    const request = new Promise(res => {
      res(
        Instance.get('vendors/materials?provider=vendor', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
      );
    });
    request.then(({data: data}) => {
      console.log('started', data);
      setMaterials(data.data);
    });
  };

  useEffect(() => {
    //**gets all materials */
    const request = new Promise(res => {
      res(
        Instance.get('vendors/materials?provider=vendor', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
      );
    });
    request.then(({data: data}) => {
      setMaterials(data.data);
    });
  }, [access_token]);

  return [materials, reload];
};
