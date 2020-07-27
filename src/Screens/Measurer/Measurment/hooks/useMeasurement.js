import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import Instance from '../../../../Api/Instance';
import useApi from '../../../../Api/useApi';

export default () => {
  const [results, setResults] = useState([]);
  const [propt, setPropt] = useState([]);
  const [Allmeasurement, setMesurements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [nameStyleVisible, setNameStyleVisible] = useState(false);
  const [AddedStyleVisible, setAddedStyleVisible] = useState(false);

  const [measurement_id, setMeasurement_id] = useState(' ');
  const options = {};

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;
  const [HandleRequest] = useApi();

  const handlePropts = async cat_id => {
    setLoading(true);
    try {
      const request = HandleRequest(
        `vendors/measurer/measurements/categories/${cat_id}/properties?provider=vendor`,
        'get',
      );
      request.then(data => {
        setPropt(data.data.properties);
        setLoading(false);
      });
    } catch (err) {
      alert('Something went wrong');
      setLoading(false);
    }
  };
  const AddMesurement = async data => {
    setLoading(true);
    try {
      const request = HandleRequest(
        `vendors/measurer/jobs/measurements/add?provider=vendor`,
        'post',
        data,
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            duration: 3000,
            type: 'success',
            position: 'top',
          });
          setNameStyleVisible(false);
          setAddedStyleVisible(true);
        } else {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            duration: 3000,
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        }
      });
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const getList = async () => {
    setMeasurement_id(null);
    setLoading(true);
    try {
      const req = HandleRequest(
        'vendors/measurer/measurements/categories?provider=vendor',
        'get',
      );
      req.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setLoading(false);
          setResults(data.data);
        } else {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            duration: 3000,
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return [
    results,
    propt,
    handlePropts,
    Allmeasurement,
    AddMesurement,
    loading,
    getList,
    amount,
    measurement_id,
    setMeasurement_id,
    nameStyleVisible,
    AddedStyleVisible,
    setAddedStyleVisible,
    setNameStyleVisible,
  ];
};
