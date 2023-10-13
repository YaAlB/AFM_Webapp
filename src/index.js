import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';

import { store } from './app/store'
import { Provider } from 'react-redux'
// import NavBar from './components/NavBar/NavBar.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
        {/* <NavBar/> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);