'use strict'

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
const faker = require('faker');
const sns = new AWS.SNS();
const sqs = new AWS.SQS();
const uuid = require('uuid').v4

const topic = 'arn:aws:sns:us-west-1:243024959050:pickup.fifo'
let queueArn = 'arn:aws:sqs:us-west-1:243024959050:BrycesCodingEmporium'
const send = async (groupId, payload) => {
  console.log(payload)
  return await sqs
  .sendMessage({
    MessageGroupId: `group-${groupId}`,
    MessageDeduplicationId: `m-${groupId}-${faker.datatype.uuid()}`,
    MessageBody: `${payload}`,
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/243024959050/packages.fifo'
  }).promise();
}
const main = async (payload) => {
  try{
    let data = await send('A', payload);
    console.log(JSON.stringify(data))
  }catch(err){
    console.log(err)
  }
}
setInterval(() => {
  const pickupInfo = {
    vendorId: queueArn,
    customer: faker.name.findName(),
    orderId: uuid(),
    TopicArn: topic
  
  }
  main(pickupInfo)}, 5000);
// let group_id = uuid();
// setInterval(send(pickupInfo), 5000, )