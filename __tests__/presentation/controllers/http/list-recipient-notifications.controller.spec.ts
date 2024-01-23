import { NotificationMapper } from '@/domain/mappers'
import { ListRecipientNotificationsController } from '@/presentation/controllers/http'
import { throwError } from '@/tests/domain/mocks'
import { ListRecipientNotificationsSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ListRecipientNotificationsController
  listRecipientNotificationsSpy: ListRecipientNotificationsSpy
}

const makeSut = (): Sut => {
  const listRecipientNotificationsSpy = new ListRecipientNotificationsSpy()
  const sut = new ListRecipientNotificationsController(
    listRecipientNotificationsSpy,
  )

  return {
    sut,
    listRecipientNotificationsSpy,
  }
}

describe('ListRecipientNotificationsController', () => {
  it('should call ListRecipientNotifications', async () => {
    const { sut, listRecipientNotificationsSpy } = makeSut()
    const recipientId = faker.string.uuid()

    await sut.handle(recipientId)

    expect(listRecipientNotificationsSpy.calledTimes).toBe(1)
    expect(listRecipientNotificationsSpy.recipientId).toStrictEqual(recipientId)
  })

  it('should return recipient notifications list', async () => {
    const { sut, listRecipientNotificationsSpy } = makeSut()

    const result = await sut.handle('')

    const expected = {
      notifications: listRecipientNotificationsSpy.result.notifications.map(n =>
        new NotificationMapper(n).toHttp(),
      ),
    }
    expect(result).toStrictEqual(expected)
  })

  it('should throw if any dependency throws', async () => {
    const suts: ListRecipientNotificationsController[] = [
      new ListRecipientNotificationsController({ list: () => throwError() }),
    ]

    for (const sut of suts) {
      const promise = sut.handle('')
      await expect(promise).rejects.toThrow()
    }
  })
})
