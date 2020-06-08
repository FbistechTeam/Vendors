import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import Instance from '../../../../Api/Instance';

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

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const getList = async () => {
    setMeasurement_id(null);
    setLoading(true);
    try {
      const req = await Instance.get(
        'vendors/measurer/jobs/completed?provider=vendor',
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      let s = req.data.status;
      let m = req.data.message;
      if (s) {
        console.log('object', req.data.data);
        setLoading(false);
        setResults(req.data.data);
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
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePropts = async job_id => {
    setLoading(true);
    try {
      const response = await Instance.get(
        `vendors/measurer/jobs/${job_id}/details?provider=vendor`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      console.log(response);
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        setPropt(response.data.data);
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
