import { NotificationMapper } from '@/domain/mappers'
import { ListNewRecipientNotificationsController } from '@/presentation/controllers/http'
import { throwError } from '@/tests/domain/mocks'
import { ListRecipientNotificationsSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ListNewRecipientNotificationsController
  listNewRecipientNotificationsSpy: ListRecipientNotificationsSpy
}

const makeSut = (): Sut => {
  const listNewRecipientNotificationsSpy = new ListRecipientNotificationsSpy()
  const sut = new ListNewRecipientNotificationsController(
    listNewRecipientNotificationsSpy
  )
  return {
    sut,
    listNewRecipientNotificationsSpy
  }
}

describe('ListNewRecipientNotificationsController', () => {
  it('should call ListNewRecipientNotifications', async () => {
    const { sut, listNewRecipientNotificationsSpy } = makeSut()
    const recipientId = faker.datatype.uuid()

    await sut.handle(recipientId)

    expect(listNewRecipientNotificationsSpy.calledTimes).toBe(1)
    expect(listNewRecipientNotificationsSpy.recipientId).toStrictEqual(
      recipientId
    )
  })

  it('should return recipient notifications list', async () => {
    const { sut, listNewRecipientNotificationsSpy } = makeSut()

    const result = await sut.handle('')

    const expected = {
      notifications: listNewRecipientNotificationsSpy.result.notifications.map(
        n => new NotificationMapper(n).toHttp('new')
      )
    }
    expect(result).toStrictEqual(expected)
  })

  it('should throw if any dependency throws', async () => {
    const suts: ListNewRecipientNotificationsController[] = [
      new ListNewRecipientNotificationsController({ list: () => throwError() })
    ]
    for (const sut of suts) {
      const promise = sut.handle('')
      await expect(promise).rejects.toThrow()
    }
  })
})
