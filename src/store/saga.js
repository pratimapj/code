import { takeLatest, call, put , all} from 'redux-saga/effects';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './actions';

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
// Function to fetch the JSON from an API or local file
const fetchJsonData = async () => {
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
    
  // Watcher Saga
  export function* watchFetchData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchJsonSaga);
  }