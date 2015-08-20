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
    let content;
    let style = {
      marginLeft: '35px',
      marginBottom: '30px'
    }

    if (this.state.cat) {
      content = <img src={this.state.cat} />;
    } else {
      content = "Waiting Instagram ... You catta be kitten me, purr.";
    }

    return(
      <div>
        <center>
          <div style={style}>
            <img src='/assets/cat.png' />
          </div>
          {content} 
        </center>
      </div>
    )
  }
}
