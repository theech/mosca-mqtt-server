const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')

const topic = 'test123'

client.on('message', (topic, message) => {
  message = message.toString()
  console.log(`${message} on ${Date()}`)
})

client.on('connect', () => {
  client.subscribe(topic)
})
