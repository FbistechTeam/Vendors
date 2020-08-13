import {useState} from 'react';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Toast} from 'native-base';
import Instance from '../../../../Api/Instance';
import useApi from '../../../../Api/useApi';

export default () => {
  const [results, setResults] = useState([]);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState([]);
  const [resultsOngoing, setResultsOngoing] = useState([]);
  const [status1, setStatus1] = useState(false);
  const options = {};
  const [Messages, setMessage] = useState('');

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
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const run = () => {
    setLoading(true);
    const request = HandleRequest(
      'vendors/tailor/jobs/completed?provider=vendor',
      'get',
    );
    request
      .then(data => {
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
      })
      .catch(err => {
        // alert(err);/
        setLoading(false);
        // alert(err);
      });
  };

  return [
    loading,
    results,
    run,
    ViewRequest,
    openCarousel,
    setOpenCarousel,
    resultsData,
  ];
};
