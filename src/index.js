import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useDispatch, useSelector } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from 'src/store';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
