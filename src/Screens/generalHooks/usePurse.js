import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useApi from '../../Api/useApi';

export default () => {
  const [purse, setPurse] = useState([]);
  const [LoadingP, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [pendingR, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const [HandleRequest] = useApi();

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const withrawalRequest = amount => {
    setLoading(true);
    let Data = {amount};
    const request = HandleRequest(
      'vendors/withdrawals/request?provider=vendor',
      'post',
      Data,
    );

    request
      .then(data => {
        setLoading(false);

        let s = data.status;
        let m = data.message;
        if (s) {
          let d = data.data;
          setDone(true);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
        } else {
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
        console.log(err);
      });
    //**gets on-going projects */
  };

  const Run = () => {
    setLoading(true);
    /**gets user purse */
    const request = HandleRequest('vendors/purse?provider=vendor', 'get');

    request.then(data => {
      let p = data.data;
      let s = data.status;
      let m = data.message;
      if (s) {
        setPurse(data.data);
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        setMsg(m);
        setLoading(false);
      }
    });
  };

  const PendHistory = () => {
    /**get pending withdrawals */
    const requestPending = HandleRequest(
      'vendors/withdrawals/pending?provider=vendor',
      'get',
    );
    requestPending.then(data => {
      let p = data;
      console.log(p);
      let s = data.status;
      let m = data.message;
      if (s) {
        setPending(data.data);
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        setLoading(false);
      }
    });
  };
  const withdrawHistory = () => {
    /**get pending withdrawals */
    const requestHistory = HandleRequest(
      'vendors/withdrawals?provider=vendor',
      'get',
    );

    requestHistory.then(data => {
      let p = data;
      let s = data.status;
      let m = data.message;
      if (s) {
        setHistory(data.data);
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        setLoading(false);
      }
    });
  };

  return [
    LoadingP,
    Run,
    purse,
    withrawalRequest,
    done,
    setDone,
    pendingR,
    history,
    msg,
    PendHistory,
    withdrawHistory,
  ];
};
