import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor () {
    super()

    const host = location.origin.replace(/^http/, 'ws')
    const socket = io.connect(host)

    this.state = {
      socket,
      content: null
    }

    this.fetchRecents()
  }

  fetchRecents () {
    this.state.socket.on('cats', (data) => {
      this.setState({ cat: data.cat[0].images.standard_resolution.url })
    })
  }

  render () {
    const message = 'Waiting Instagram ... You catta be kitten me, purr.'
    let { content, cat } = this.state

    cat ? content = <img src={this.state.cat} height={50%} width={50%} /> : content = message

    const style = {
      marginLeft: '35px',
      marginBottom: '30px'
    }

    return (
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
