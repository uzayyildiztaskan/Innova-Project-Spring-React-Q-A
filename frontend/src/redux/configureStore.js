import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 
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
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));
  
    store.subscribe(() => {
      updateStateInStorage(store.getState());
    });

    return store;
  };

  export default configureStore;