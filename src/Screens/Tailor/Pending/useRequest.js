import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Instance from '../../../Api/Instance';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Toast} from 'native-base';
import useApi from '../../../Api/useApi';

export default () => {
  const [results, setResults] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [resultsOngoing, setResultsOngoing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [Messages, setMessage] = useState('');
  const [reqMessages, setReqMessage] = useState('');
  const options = {};

  const {userData, tailor_category_id} = useSelector(
    state => state.LoginReducer,
  );
  let {access_token} = userData;

  const [HandleRequest] = useApi();
  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  //** sort fabrics */
  const ViewRequest = async job_id => {
    setLoading(true);
    setResultsData([]);
    try {
      const response = HandleRequest(
        `vendors/tailor/jobs/${job_id}/details?provider=vendor`,
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setResultsData(data.data);
          setOpenCarousel(true);
          setLoading(false);
        } else {
          setLoading(false);
          setReqMessage(m);
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  /**to trigger a project to completion */

  const CompleteRequest = async job_id => {
    setLoading(true);
    const dataId = {job_id};
    try {
      const response = HandleRequest(
        'vendors/tailor/jobs/trigger-completion?provider=vendor',
        'put',
        dataId,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          run();
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
          run();
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  // gets Job info
  const jobInfo = async job_id => {
    setLoading(true);
    const dataId = {job_id};
    try {
      const response = HandleRequest(
        `vendors/tailor/jobs/${job_id}/details?provider=vendor`,
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setResults(data.data);

          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const run = async () => {
    setLoading(true);
    /**get all pending requests */
    try {
      const response = HandleRequest(
        'vendors/tailor/jobs/pending?provider=vendor',
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setLoading(false);
          let d = data.data;
          setResults(d);
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }

    try {
      const response = HandleRequest(
        `vendors/tailor/jobs/ongoing?provider=vendor`,
        'get',
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setResultsOngoing(data.data);
          setStatus1(s);
        } else {
          setStatus1(s);
          setMessage(m);
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  /**to accept requests */
  const AcceptRequest = async job_id => {
    setLoading(true);
    const dataId = {job_id};
    try {
      const response = HandleRequest(
        'vendors/tailor/jobs/accept?provider=vendor',
        'put',
        dataId,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          run();
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
          run();
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [
    loading,
    results,
    resultsOngoing,
    Messages,
    status1,
    ViewRequest,
    reqMessages,
    setReqMessage,
    CompleteRequest,
    run,
    AcceptRequest,
    jobInfo,
    resultsData,
    openCarousel,
    setOpenCarousel,
  ];
};
