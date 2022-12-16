import { CountRecipientNotifications } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import { FindRecipientNotificationsRepositorySpy } from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: CountRecipientNotifications
  findRecipientNotificationsRepositorySpy: FindRecipientNotificationsRepositorySpy
}

const makeSut = (): Sut => {
  const findRecipientNotificationsRepositorySpy =
    new FindRecipientNotificationsRepositorySpy()
  const sut = new CountRecipientNotifications(
    findRecipientNotificationsRepositorySpy
  )
  return {
    sut,
    findRecipientNotificationsRepositorySpy
  }
}

describe('CountRecipientNotifications', () => {
  it('should call FindRecipientNotificationsRepository with recipient id', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()
    const recipientId = faker.datatype.uuid()

    await sut.count(recipientId)

    expect(findRecipientNotificationsRepositorySpy.calledTimes).toBe(1)
    expect(findRecipientNotificationsRepositorySpy.recipientId).toStrictEqual(
      recipientId
    )
  })

  it('should return notifications count', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()

    const result = await sut.count('')

    const expected =
      findRecipientNotificationsRepositorySpy.notifications.length
    expect(result.count).toBe(expected)
  })

  it('should throw if any dependency throws', async () => {
    const suts: CountRecipientNotifications[] = [
      new CountRecipientNotifications({
        findRecipientNotifications: () => throwError()
      })
    ]
    for (const sut of suts) {
      const promise = sut.count('')
      await expect(promise).rejects.toThrow()
    }
  })
})
