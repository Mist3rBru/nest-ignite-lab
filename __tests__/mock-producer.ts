/* eslint-disable unicorn/no-process-exit */
import { type Notification } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { Kafka } from 'kafkajs'

let message: Notification.Params
;(async (): Promise<void> => {
  const kafka = new Kafka({
    clientId: 'mock-producer',
    brokers: ['localhost:9092'],
    retry: {
      initialRetryTime: 300,
      retries: 10,
    },
  })
  const producer = kafka.producer()
  await producer.connect()

  message = {
    content: faker.lorem.sentence(),
    category: faker.lorem.word(),
    recipientId: faker.string.uuid(),
  }

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  })
})()
  .then(() => {
    console.log({ message })
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
