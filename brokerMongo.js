const mosca = require('mosca')
const mongo = require('mongodb')

const settings = { port: 1234 }
const broker = new mosca.Server(settings)

// mongodb
const mongc = mongo.MongoClient
const url =
  'mongodb+srv://tee:123@devcconnector.mk6tn.mongodb.net/mqttserver?retryWrites=true&w=majority'

broker.on('ready', () => {
  console.log('Broker is ready!')
})

broker.on('published', (packet) => {
  message = packet.payload.toString()
  console.log(message)

  if (message.slice(0, 1) != '{' && message.slice(0, 4) != 'mqtt') {
    mongc.connect(url, (error, client) => {
      const myCol = client.db('mqttserver').collection('test2')
      myCol.insertOne(
        {
          message: message,
        },
        () => {
          console.log('Data is save to database')
          client.close()
        }
      )
    })
  }
})
