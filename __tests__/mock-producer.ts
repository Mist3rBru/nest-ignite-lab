/* eslint-disable */
import { Notification } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { Kafka } from 'kafkajs'

let message: Notification.Params = {} as any

;(async () => {
  const kafka = new Kafka({
    clientId: 'mock-producer',
    brokers: ['localhost:9092'],
    retry: {
      initialRetryTime: 300,
      retries: 10
    }
  })
  const producer = kafka.producer()
  await producer.connect()

  message = {
    content: faker.lorem.sentence(),
    category: faker.lorem.word(),
    recipientId: faker.datatype.uuid()
  }

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify(message)
      }
    ]
  })
})()
  .then(() => {
    console.log({ message })
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
