import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor() {
    super();

    let host = location.origin.replace(/^http/, 'ws');
    let socket = io.connect(host);

    this.state = { socket };
    this.fetchRecents();
  }

  fetchRecents() {
    this.state.socket.on('cats', (data) => {
      this.setState({ cat: data.cat[0].images.standard_resolution.url });
    });
  }

  render() {
    return(
      <div>
        <center>
          <img src='/assets/cat.png' />
          <img src={this.state.cat} />
        </center>
      </div>
    )
  }
}
