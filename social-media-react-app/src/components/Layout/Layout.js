import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import SideNav from '../SideNav/SideNav';
import { Wrapper } from './Layout.styles';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <Wrapper>
        <SideNav />
        <Container>
          {this.props.children}
        </Container>
      </Wrapper>
    );
  }
}
