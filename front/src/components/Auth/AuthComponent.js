// @flow

import React, { Component } from 'react';

import { hasRole, isLoggedIn } from "data/auth";

class Auth extends Component {
  render() {
    const { children, roles, not, logged } = this.props;

    if (isLoggedIn() && logged) {
      return <span>{children}</span>;
    }

    if (not && !isLoggedIn()) {
      return <span>{children}</span>;
    }

    if (!roles && !not && isLoggedIn()) return <span>{children}</span>;

    if (roles && isLoggedIn() && hasRole(roles)) {
      return <span>{children}</span>;
    }

    return null;
  }
}

export default Auth;
