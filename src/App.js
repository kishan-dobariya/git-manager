import React from 'react';

import Header from './components/Header';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentFlag: 1,
    };
  }

  changeComponent = (flag) => this.setState({ componentFlag: flag });

  render() {
    return (
      <div className="MainContainer">
        <Header logout={this.logout} changeComponent={this.changeComponent} />
      </div>
    );
  }
}

export default App;
