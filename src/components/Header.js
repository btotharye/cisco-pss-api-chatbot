import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';


class Header extends Component {
  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Cisco PSS Chatbot</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
