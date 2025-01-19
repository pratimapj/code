// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
//D:\Praatima\Westpac\code\src\components\Modal.css
// Mock CSS imports
jest.mock('./components/Modal.css', () => {
    return {};
  });