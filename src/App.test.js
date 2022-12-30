import { render, screen } from '@testing-library/react';
import App from './App';


// default test from the c-r-a. 
// TOOD: Add actual tests for this app
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/C/i);
  expect(linkElement).toBeInTheDocument();
});
