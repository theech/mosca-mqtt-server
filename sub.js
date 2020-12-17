const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

const topics = ['temp', 'humid', 'test123']

client.on('connect', () => {
  topics.forEach((topic) => {
    client.subscribe(topic)
  })
})

client.on('message', (topics, message, packet) => {
  message = message.toString()
  if (topics === packet.topic) {
    console.log(`${packet.topic}: ${message}`)
  }
})
