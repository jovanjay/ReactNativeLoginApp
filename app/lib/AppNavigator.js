/**
 * Application Nagivator using react-navigation
 * Stacks React Components to a Navigator
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import SplashScreen from '../components/Splash';
import MainScreen from '../components/Main';
import LoginScreen from '../components/Login';
import RegisterScreen from '../components/Register';
import DashBoardScreen from '../components/Dashboard';

//Navigator Stack
export const AppNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions:  {
      headerLeft: null
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions:  {
      headerLeft: null
    }
  },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Dashboard: { 
    screen: DashBoardScreen,
    navigationOptions: {
      headerLeft: null,
      title: 'My App'
    }
   },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.navReducer,
});

export default connect(mapStateToProps)(AppWithNavigationState);
