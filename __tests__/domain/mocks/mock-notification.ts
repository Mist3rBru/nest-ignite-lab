import { Notification } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockNotification = (): Notification => {
  return new Notification({
    category: faker.lorem.word(),
    content: faker.lorem.sentence(),
    recipientId: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    readAt: faker.date.past()
  })
}
