import { createStore } from 'redux';
import authReducer from'./authReducer';

const configureStore = () => {
    const askAuth = localStorage.getItem('ask-auth');

    let stateInLocalStorage = {
      isLoggedIn: false,
      username: undefined,
      displayName: undefined,
      image: undefined,
      password: undefined
    };

    if(askAuth){
      try {
        stateInLocalStorage = JSON.parse(askAuth);
      }catch (error) {

      }
    }

    const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
    store.subscribe(() => {
      localStorage.setItem('ask-auth', JSON.stringify(store.getState()))
    })

    return store;
  };

  export default configureStore;