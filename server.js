const tls = require('tls')
const fs = require('fs')

const PORT = 1337
const HOST = '127.0.0.1'

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem')
}

const server = tls.createServer(options)

server.on("secureConnection", (socket) => {

  // Send a friendly message
  socket.write("I am the server sending you a message.")

  // Print the data that we received
  socket.on('data', function (data) {
    console.log(data.toString())
  })

  // Let us know when the transmission is over
  socket.on('end', function () {
    console.log('EOT (End Of Transmission)')
  })
})

// Start listening on a specific port and address
server.listen(PORT, HOST, function () {
  console.log("I'm listening at %s, on port %s", HOST, PORT)
})

// When an error occurs, show it.
server.on('error', function (error) {
  console.error(error)
  // Close the connection after the error occurred.
  server.destroy()
})