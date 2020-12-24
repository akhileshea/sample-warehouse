import React, {Component} from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
require('dotenv').config();
const store = ConfigureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <Provider store={store}>
          <div className="app-style">
            <BrowserRouter>
              <Main/>
            </BrowserRouter>
          </div>
      </Provider>
      
    );
  }

}

export default App;