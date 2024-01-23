import { CountRecipientNotificationsController } from '@/presentation/controllers/http'
import { throwError } from '@/tests/domain/mocks'
import { CountRecipientNotificationsSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: CountRecipientNotificationsController
  countRecipientNotificationsSpy: CountRecipientNotificationsSpy
}

const makeSut = (): Sut => {
  const countRecipientNotificationsSpy = new CountRecipientNotificationsSpy()
  const sut = new CountRecipientNotificationsController(
    countRecipientNotificationsSpy,
  )

  return {
    sut,
    countRecipientNotificationsSpy,
  }
}

describe('CountRecipientNotificationsController', () => {
  it('should call CountRecipientNotifications', async () => {
    const { sut, countRecipientNotificationsSpy } = makeSut()
    const recipientId = faker.string.uuid()

    await sut.handle(recipientId)

    expect(countRecipientNotificationsSpy.calledTimes).toBe(1)
    expect(countRecipientNotificationsSpy.recipientId).toStrictEqual(
      recipientId,
    )
  })

  it('should return recipient notifications count', async () => {
    const { sut, countRecipientNotificationsSpy } = makeSut()

    const result = await sut.handle('')

    const expected = {
      count: countRecipientNotificationsSpy.result.count,
    }
    expect(result).toStrictEqual(expected)
  })

  it('should throw if any dependency throws', async () => {
    const suts: CountRecipientNotificationsController[] = [
      new CountRecipientNotificationsController({ count: () => throwError() }),
    ]

    for (const sut of suts) {
      const promise = sut.handle('')
      await expect(promise).rejects.toThrow()
    }
  })
})
