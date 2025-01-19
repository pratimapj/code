import CompanyDetails from './components/CompanyDetails'
import EmployeeList from './components/EmployeeList'
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css'
function App() {
  return (
    <Provider store={store}>
    <div className="container">
    <div className="inner-container">
        <CompanyDetails />
        <EmployeeList/>
      </div>
  </div>
  </Provider>
  );
}

export default App;
