import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store';
import Menu from './Menu';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Menu/>
      </div>
    </Provider>
  );
}

export default App;

