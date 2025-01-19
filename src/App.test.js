import { render, screen } from '@testing-library/react';
import App from './App'; // Import your App component
import { Provider } from 'react-redux';
import store from './store/store'; // Import the store
import '@testing-library/jest-dom';
// Wrap the component with Redux Provider to ensure store is passed down
const renderWithStore = (ui) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

xdescribe('App Component', () => {
  test('renders without crashing', () => {
    // Render the App component
    renderWithStore(<App />);
    
    // Check if elements are rendered properly
    // Adjust these based on your components' actual contents
    expect(screen.getByText(/company details/i)).toBeInTheDocument();
    expect(screen.getByText(/employee list/i)).toBeInTheDocument();
  });

  test('renders company details section', () => {
    renderWithStore(<App />);
    
    // Check if the CompanyDetails component is rendered
    expect(screen.getByText(/company details/i)).toBeInTheDocument();
    //expect(screen.getByText(/company details/i)).toBeInTheDocument();
  });

  xtest('renders employee list section', () => {
    renderWithStore(<App />);
    
    // Check if the EmployeeList component is rendered
    expect(screen.getByText(/comany name/i)).toBeInTheDocument();
  });
});