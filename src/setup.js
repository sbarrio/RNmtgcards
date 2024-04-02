import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { App } from './navigation/navigation'


function setup(): ReactClass<{}> {
  
    class Root extends React.Component {
  
      constructor() {
        super();
      }  

      render() {

        return (
          <Provider store={store}>
            <App/>
          </Provider>
        );
      }
    }
  
    return Root;
  }

  export default setup;


