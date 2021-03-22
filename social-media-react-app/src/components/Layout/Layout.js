import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import SideNav from '../SideNav/SideNav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <SideNav />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
