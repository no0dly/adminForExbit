import config from './config'

const websocket = () => {
  let socket

  return {
    socketInit() {
      return new Promise((resolve) => {
        socket = new WebSocket(config.websocketUrl)

        socket.onopen = function(data) {
          resolve(socket)
        }
      })
    },
    getSocket() {
      return socket
    }
  }
}

export default websocket
