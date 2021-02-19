import { createStore } from 'redux';
import authReducer from'./authReducer';

const configureStore = () => {
    const hoaxAuth = localStorage.getItem('hoax-auth');

    let stateInLocalStoreage = {
      isLoggedIn: false,
      username: undefined,
      displayName: undefined,
      image: undefined,
      password: undefined
    };

    if(hoaxAuth){
      try {
        stateInLocalStoreage = JSON.parse(hoaxAuth);
      }catch (error) {

      }
    }

    const store = createStore(authReducer, stateInLocalStoreage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
    store.subscribe(() => {
      localStorage.setItem('ask-auth', JSON.stringify(store.getState()))
    })

    return store;
  };

  export default configureStore;