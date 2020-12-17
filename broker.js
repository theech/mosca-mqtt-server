const mosca = require('mosca')
const settings = { port: 1883 }

const broker = new mosca.Server(settings)

broker.on('ready', () => {
  console.log('Broker is ready!')
})
