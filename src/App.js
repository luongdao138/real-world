import { Container } from '@material-ui/core';
import React from 'react';
import Appbar from './components/Appbar';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './redux/actions/currentUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasssord from './pages/ResetPassword';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUser.info);
  const token = useSelector((state) => state.currentUser.token);

  useEffect(() => {
    if (token !== '') {
      dispatch(fetchUser(token));
    }
  }, []);

  return (
    <div className='App'>
      <Container>
        <Router>
          <Appbar user={user} token={token} />
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/user/login'>
              <Login />
            </Route>
            {/* <Route path='/user/signup'>
              <Signup />
            </Route> */}
            <Route path='/user/forgotPassword'>
              <ForgotPassword />
            </Route>
            <Route path='/user/resetPassword/:token' exact>
              <ResetPasssord />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
