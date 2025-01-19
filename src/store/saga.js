import { takeLatest, call, put , all} from 'redux-saga/effects';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './actions';
import compnayData from './sample-data.json'

import {
  
  FETCH_DATA_SUCCESS,

} from './actions';

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
//D:\Praatima\Westpac\code\src\store\sample-data.json
// Function to fetch the JSON from an API or local file
const fetchJsonData = async () => {
  //./src/store/store.js
  const response = await fetch('/sample-data.json');
  if (!response.ok) throw new Error('Failed to fetch JSON');
  return await response.json();
};


function* fetchJsonSaga() {
  try {
    const data = yield call(fetchJsonData);
    console.log("final data", data)
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure('error'));
  }
}



function* fetchDataSaga() {
  console.log('ff inside fetch')
    try {
      
      // const response = yield call(fetchLocalData);
      //  const response = yield call(fetch, './sample-data.json');  // Adjust path as necessary
    
    //console.log('response 11', response.json())
 
   // yield put(fetchDataSuccess(compnayData)); // Dispatch success action
    } catch (error) {
    //  yield put(fetchDataFailure('error')); // Dispatch failure action
    }
  }
  
  
  // Watcher Saga
  export function* watchFetchData() {
    //yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
    yield takeLatest(FETCH_DATA_REQUEST, fetchJsonSaga);
  }