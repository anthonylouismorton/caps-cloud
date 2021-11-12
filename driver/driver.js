'use strict'

const {Consumer} = require('sqs-consumer');
const queueUrl = 'https://sqs.us-west-1.amazonaws.com/243024959050/packages.fifo'


const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: (message) => {
    console.log(message.Body)
    console.log(JSON.stringify(message.Body));
  },
  //pollingWaitTimeMs: 4000,
})

app.on('error', (err) => {
  console.error(err.message)
})

// app.on('message_processed', (err) => {
//   if(err) console.log(err)
//   console.log('pacage delivered', )
// })

app.start();