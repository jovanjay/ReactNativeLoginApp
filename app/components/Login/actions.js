/**
 * Action creator
 * https://github.com/reactjs/redux/issues/291
 */
import * as actionTypes from '../../AppActionTypes';
import {getLogin, getIsLogin} from '../../reducers/loginReducers';
import Http from '../../AppHttp';
import { NavigationActions } from 'react-navigation';
import {
  AsyncStorage,
  XMLHttpRequest
} from 'react-native';

//Actions creator for Success Login
export const loginSuccess = (reponse) => {
  return (dispatch, getState) => {
    const {onLogging} = getLogin(getState());
    const {isLoggedIn} = getIsLogin(getState());

    if(!onLogging && isLoggedIn)
    {
        dispatch({error, type: actionTypes.LOGIN_SUCCESS});
        NavigationActions.navigate({ routeName: 'Dashboard' });
    }
  };
}

//Actions creator for Login Request - not part of dispatch for synchronous calls
export const loginRequest = (email, password) => {
  const user = {email: email, password: password};
  return { user, type: LOGIN_ATTEMPT };
}

//Action creator for Login Error - not part of dispatch for synchronous calls
export const loginError = (error) => {
  return {error, type: actionTypes.LOGIN_ERROR};
}

/**
 * The main login action
 * call this on the component as :
 * this.props.login(); or this.props.dispatch(login());
 */
export const login = (user) => {
  return (dispatch, getState) => {
    //tell app that is logging in
    dispatch(loginRequest(user.email, user.password));

    const {onLogging} = getLogin(getState());
    const {isLoggedIn} = getIsLogin(getState());

    if(!onLogging && !isLoggedIn) {

      //call server for auth
      Http.post('/m/login', {
        'email' : user.email,
        'password' : user.password,
        'type' : 0
      })
      .then(response => {
        if(reponse.status == 200 && response.status < 300)
        {
          try {
            //TODO - Store Something here
            dispatch(loginSuccess(response));
          } catch (error) {
            dispatch(loginError(error));
          }
        }
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loginError(error));
      });
    }
  };
}
