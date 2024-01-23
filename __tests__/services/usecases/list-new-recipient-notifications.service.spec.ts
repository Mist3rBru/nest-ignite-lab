import { ListNewRecipientNotifications } from '@/services/usecases'
import { mockNotification, throwError } from '@/tests/domain/mocks'
import { FindRecipientNotificationsRepositorySpy } from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ListNewRecipientNotifications
  findRecipientNotificationsRepositorySpy: FindRecipientNotificationsRepositorySpy
}

const makeSut = (): Sut => {
  const findRecipientNotificationsRepositorySpy =
    new FindRecipientNotificationsRepositorySpy()
  const sut = new ListNewRecipientNotifications(
    findRecipientNotificationsRepositorySpy,
  )

  return {
    sut,
    findRecipientNotificationsRepositorySpy,
  }
}

describe('ListNewRecipientNotifications', () => {
  it('should call FindRecipientNotificationsRepository with recipient id', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()
    const recipientId = faker.string.uuid()

    await sut.list(recipientId)

    expect(findRecipientNotificationsRepositorySpy.calledTimes).toBe(1)
    expect(findRecipientNotificationsRepositorySpy.recipientId).toStrictEqual(
      recipientId,
    )
  })

  it('should return new notifications list', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()
    findRecipientNotificationsRepositorySpy.notifications = [
      mockNotification({ canceledAt: new Date() }),
      mockNotification({ readAt: new Date() }),
      mockNotification({ canceledAt: null, readAt: null }),
    ]

    const result = await sut.list('')

    expect(result.notifications).toHaveLength(1)
  })

  it('should throw if any dependency throws', async () => {
    const suts: ListNewRecipientNotifications[] = [
      new ListNewRecipientNotifications({
        findRecipientNotifications: () => throwError(),
      }),
    ]

    for (const sut of suts) {
      const promise = sut.list('')
      await expect(promise).rejects.toThrow()
    }
  })
})
