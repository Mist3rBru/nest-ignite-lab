import { ListRecipientNotifications } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import { FindRecipientNotificationsRepositorySpy } from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ListRecipientNotifications
  findRecipientNotificationsRepositorySpy: FindRecipientNotificationsRepositorySpy
}

const makeSut = (): Sut => {
  const findRecipientNotificationsRepositorySpy =
    new FindRecipientNotificationsRepositorySpy()
  const sut = new ListRecipientNotifications(
    findRecipientNotificationsRepositorySpy
  )
  return {
    sut,
    findRecipientNotificationsRepositorySpy
  }
}

describe('ListRecipientNotifications', () => {
  it('should call FindRecipientNotificationsRepository with recipient id', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()
    const recipientId = faker.datatype.uuid()

    await sut.list(recipientId)

    expect(findRecipientNotificationsRepositorySpy.calledTimes).toBe(1)
    expect(findRecipientNotificationsRepositorySpy.recipientId).toStrictEqual(
      recipientId
    )
  })

  it('should return notifications list', async () => {
    const { sut, findRecipientNotificationsRepositorySpy } = makeSut()

    const result = await sut.list('')

    const expected = {
      notifications: findRecipientNotificationsRepositorySpy.notifications
    }
    expect(result).toStrictEqual(expected)
  })

  it('should throw if any dependency throws', async () => {
    const suts: ListRecipientNotifications[] = [
      new ListRecipientNotifications({
        findRecipientNotifications: () => throwError()
      })
    ]
    for (const sut of suts) {
      const promise = sut.list('')
      await expect(promise).rejects.toThrow()
    }
  })
})
