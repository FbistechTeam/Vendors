import {useState} from 'react';
import {useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useApi from '../../Api/useApi';

export default () => {
  const [accepted, setAccepted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;
  const [HandleRequest] = useApi();

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const RunAnalytics = async () => {
    setLoading(true);
    try {
      const request = HandleRequest(
        `vendors/tailor/analytics/total_accepted_requests?provider=vendor`,
        'get',
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setAccepted(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const requestCompleted = HandleRequest(
        'vendors/tailor/analytics/total_completed_jobs?provider=vendor',
        'get',
      );
      requestCompleted.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setCompleted(data.data);
        } else {
          setLoading(false);
        }
      });

      const requestReviews = HandleRequest(
        'vendors/tailor/jobs/reviews?provider=vendor',
        'get',
      );
      requestReviews.then(data => {
        let s3 = data.status;
        let m3 = data.message;
        if (s3) {
          setReviews(data.data);
        } else {
          setLoading(false);
          setMessage(m3);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [accepted, completed, reviews, message, RunAnalytics];
};
