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
  const [status, setStatus] = useState(false);
  const [AddedStyleVisible, setAddedStyleVisible] = useState(false);
  const [CompletedModalView, setCompletedModalView] = useState(false);
  const [measurement_id, setMeasurement_id] = useState(' ');
  const options = {};

  const [HandleRequest] = useApi();

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const getList = async () => {
    setMeasurement_id(null);
    setLoading(true);
    try {
      const req = HandleRequest(
        'vendors/measurer/jobs/completed?provider=vendor',
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
      setLoading(false);
    }
  };

  const handlePropts = async job_id => {
    setLoading(true);
    try {
      const response = HandleRequest(
        `vendors/measurer/jobs/${job_id}/details?provider=vendor`,
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setPropt(data.data);
          setCompletedModalView(true);
          setLoading(false);
          setStatus(true);
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
      setLoading(false);
    }
  };

  return [
    loading,
    results,
    getList,
    handlePropts,
    propt,
    CompletedModalView,
    setCompletedModalView,
    status,
    setStatus,
  ];
};
