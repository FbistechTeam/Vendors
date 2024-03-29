import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Instance from '../../Api/Instance';
import useApi from '../../Api/useApi';

export default () => {
  const [Bank, setBank] = useState([]);
  const [currentBank, setCurrentBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bvnModalVisible, setBvnModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [HandleRequest] = useApi();

  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
    zIndex: 11111,
  };

  //** Update Bvn */
  const updateBvn = async bvn => {
    setLoading(true);
    let data = {bvn: bvn};
    try {
      const response = HandleRequest(
        'vendors/banks/bvn/update?provider=vendor',
        'put',
        data,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          // setResults(response.data.data);
          setLoading(false);
          setBvnModalVisible(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
        } else {
          setLoading(false);
          // setReqMessage(m);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'bottom',
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

  //** Delete Bank*/
  const DeleteBank = async id => {
    setLoading(true);
    try {
      const response = await Instance.delete(
        'vendors/banks/delete?provider=vendor',

        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
          data: {vendor_bank_id: id},
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        // setResults(response.data.data);
        setLoading(false);
        setDeleteModal(false);
        setModalVisible2(false);
        reload();
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
      } else {
        setLoading(false);
        // setReqMessage(m);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'bottom',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      console.log(err);
      setLoading(false);
    }
  };

  //**Adds bank */
  const AddBank = async bankData => {
    setLoading(true);
    try {
      const response = HandleRequest(
        'vendors/banks/add?provider=vendor',
        'post',
        bankData,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          // setResults(response.data.data);
          setModalVisible(false);
          setLoading(false);
          reload();
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
        } else {
          setLoading(false);
          // setReqMessage(m);
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
  const setDefault = async bankData => {
    setLoading(true);
    try {
      const response = HandleRequest(
        'vendors/banks/set-default?provider=vendor',
        'put',
        bankData,
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
        } else {
          setLoading(false);
          // setReqMessage(m);
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

  /**to  reloadbanks after adding */
  const reload = () => {
    const requestMyBanks = HandleRequest(
      'vendors/banks?provider=vendor',
      'get',
    );

    requestMyBanks.then(data => {
      let s = data.status;
      let m = data.message;
      if (s) {
        setCurrentBank(data.data);
        setLoading(false);
      } else {
        setLoading(false);
        // setReqMessage(m);
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
  };

  const Run = () => {
    setLoading(true);
    /**get sall banks */
    const request = HandleRequest('banks?provider=vendor', 'get');
    request
      .then(data => {
        let p = data.data;
        setBank(data.data);
      })
      .catch(err => {
        console.log('first', err);
      });

    //**gets user added banks */
    const requestMyBanks = HandleRequest(
      'vendors/banks?provider=vendor',
      'get',
    );

    requestMyBanks.then(data => {
      let s = data.status;
      let m = data.message;
      if (s) {
        setCurrentBank(data.data);
        setLoading(false);
      } else {
        setLoading(false);
        // setReqMessage(m);
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
  };

  return [
    loading,
    Run,
    Bank,
    AddBank,
    currentBank,
    setDefault,
    reload,
    updateBvn,
    modalVisible,
    setModalVisible,
    bvnModalVisible,
    setBvnModalVisible,
    DeleteBank,
    deleteModal,
    setDeleteModal,
    modalVisible2,
    setModalVisible2,
  ];
};
