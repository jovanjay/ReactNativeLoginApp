/**
 * Consolidate all reducers to be used on the Components
 */
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../lib/AppNavigator';

/**
 * Main Navigation Reducer
 */
import navReducer from './navReducers';

/**
 * Component Reducers / Selectors (*)
 */
import loginReducer from './loginReducers';
import splashReducer from './splashReducers';
import registerReducer from './registerReducers';
import dashboardReducer from './dashboardReducers';

//Combine all reducers
const AppReducer = combineReducers({
  navReducer,
  splashReducer,
  loginReducer,
  registerReducer,
  dashboardReducer,
});

export default AppReducer;
