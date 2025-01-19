import { takeLatest, call, put , all} from 'redux-saga/effects';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './actions';
import compnayData from './sample-data.json'

import {
  
  FETCH_DATA_SUCCESS,

} from './actions';

export default function* rootSaga() {
  yield all([watchFetchData()]);
}

const fetchLocalData = () => {
  return fetch('/sample-data.json')
    .then((response) => {
      console.log('data 11', response)
      return response.json()}
    
    
  )
    .catch((error) => { throw error });
};

function* fetchDataSaga() {
    try {
      
      // const response = yield call(fetchLocalData);
        const response = yield call(fetch, '/sample-data.json');  // Adjust path as necessary
    
    //console.log('response 11', response.json())
 
    yield put(fetchDataSuccess(compnayData)); // Dispatch success action
    } catch (error) {
      yield put(fetchDataFailure('error')); // Dispatch failure action
    }
  }
  
  // Watcher Saga
  export function* watchFetchData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
  }