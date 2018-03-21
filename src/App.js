import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import './assets/css/bootstrap.css';
import './assets/css/bootstrap.min.css';
import steps from './config/steps';
import chat_styles from './config/chatstyles'
import './assets/css/main.css';
import botAvatar from './assets/images/bot.jpg'



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container content">
          <div className="row justify-content-md-center">
            <div className="col">
              <ThemeProvider theme={chat_styles}>
                <ChatBot
                  steps={steps}
                  headerTitle="Cisco PSS Chat"
                  placeholder="Type away..."
                  customDelay="500"
                  botAvatar={botAvatar}
                  floating="true"
                  width="700px"
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
