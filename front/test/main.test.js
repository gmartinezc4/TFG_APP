import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { ContextProvider } from './context/Context';

describe('App component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders without crashing', () => {
    act(() => {
      ReactDOM.render(
        <ContextProvider>
          <App />
        </ContextProvider>,
        container
      );
    });
    expect(container.querySelector('h1').textContent).toBe('Hello World');
  });

  it('renders with the correct text', () => {
    act(() => {
      ReactDOM.render(
        <ContextProvider>
          <App />
        </ContextProvider>,
        container
      );
    });
    expect(container.querySelector('h1').textContent).toBe('Hello World');
  });
});