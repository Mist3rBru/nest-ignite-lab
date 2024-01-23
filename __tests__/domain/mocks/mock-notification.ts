import { Notification } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockNotification = (
  params?: Partial<Notification.Params>,
): Notification => {
  return new Notification({
    category: faker.lorem.word(),
    content: faker.lorem.sentence(),
    recipientId: faker.string.uuid(),
    ...params,
  })
}
