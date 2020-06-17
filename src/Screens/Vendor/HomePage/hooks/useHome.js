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
    // //**gets on-going projects */
    // const requestOnGoing = new Promise(res => {
    //   res(
    //     Instance.get('user/sew-jobs/ongoing?provider=user', {
    //       headers: {
    //         Authorization: 'Bearer ' + access_token,
    //       },
    //     }),
    //   );
    // });
    // requestOnGoing.then(({data: data}) => {
    //   setOnGoing(data.data);
    // });
    // //**gets completed projects */
    // const requestCompleted = new Promise(res => {
    //   res(
    //     Instance.get('user/sew-jobs/ongoing?provider=user', {
    //       headers: {
    //         Authorization: 'Bearer ' + access_token,
    //       },
    //     }),
    //   );
    // });
    // requestCompleted.then(({data: data}) => {
    //   setCompleted(data.data);
    // });
  }, [access_token]);

  return [materials, reload];
};

// export default () => {
//   const [accepted, setAccepted] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [message, setMessage] = useState([]);

//   const { userData } = useSelector(state => state.LoginReducer);
//   let { access_token } = userData;

//   const Style = {
//     width: widthPercentageToDP('88%'),
//     alignSelf: 'center',
//     borderRadius: 6,
//   };

//   useEffect(() => {
//     /**gets user profile */
//     const request = new Promise(res => {
//       res(
//         Instance.get(
//           'vendors/tailor/analytics/total_accepted_requests?provider=vendor',
//           {
//             headers: {
//               Authorization: 'Bearer ' + access_token,
//             },
//           },
//         ),
//       );
//     });
//     request.then(({ data: data }) => {
//       setAccepted(data.data);
//     });
//     /**gets completed jobs profile */
//     const requestCompleted = new Promise(res => {
//       res(
//         Instance.get(
//           'vendors/tailor/analytics/total_completed_jobs?provider=vendor',
//           {
//             headers: {
//               Authorization: 'Bearer ' + access_token,
//             },
//           },
//         ),
//       );
//     });
//     requestCompleted.then(({ data: data }) => {
//       setCompleted(data.data);
//     });
//     /**gets completed jobs reviews */
//     const requestReviews = new Promise(res => {
//       res(
//         Instance.get('vendors/tailor/jobs/reviews?provider=vendor', {
//           headers: {
//             Authorization: 'Bearer ' + access_token,
//           },
//         }),
//       );
//     });
//     requestReviews.then(({ data: data }) => {
//       console.log(data);
//       let s = data.status;
//       let m = data.message;
//       if (s) {
//         setReviews(data.data);
//       } else {
//         setMessage(m);
//       }
//     });
//   }, [access_token]);

//   return [accepted, completed, reviews, message];
// };
