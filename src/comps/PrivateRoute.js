import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, children, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;