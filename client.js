const tls = require('tls')
const fs = require('fs')

const PORT = 1337
const HOST = '127.0.0.1'

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem'),
  rejectUnauthorized: false
}

const client = tls.connect(PORT, HOST, options)

client.on("secureConnect", () => {
  // Check if the authorization worked
  if (client.authorized) {
    console.log("Connection authorized by a Certificate Authority.")
  } else {
    console.log("Connection not authorized: " + client.authorizationError)
  }
  // Send a friendly message
  client.write("I am the client sending you a message.")
})

client.on("data", function (data) {
  console.log(data.toString())
  // Close the connection after receiving the message
  //client.end()
})

client.on('close', function () {
  console.log("Connection closed")
})

// When an error ocoures, show it.
client.on('error', function (error) {
  console.error(error)
  // Close the connection after the error occurred.
  client.destroy()
})