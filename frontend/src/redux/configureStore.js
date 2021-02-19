import { createStore } from 'redux';
import authReducer from'./authReducer';
import SecureLS from 'secure-ls';

const SecureLs = new SecureLS();

const getStateFromStorage = () => {  
  const askAuth = SecureLs.get('ask-auth');

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  if(askAuth){
    return askAuth;
  } 
  return stateInLocalStorage; 
}

const updateStateInStorage = newState => {
  SecureLs.set('ask-auth', newState);
}

const configureStore = () => {

    const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
    store.subscribe(() => {
      updateStateInStorage(store.getState());
    });

    return store;
  };

  export default configureStore;