import { ISendNotification } from '@/domain/usecases'
import { SendNotification } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import { CreateNotificationRepositorySpy } from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: SendNotification
  createNotificationRepositorySpy: CreateNotificationRepositorySpy
}

const makeSut = (): Sut => {
  const createNotificationRepositorySpy = new CreateNotificationRepositorySpy()
  const sut = new SendNotification(createNotificationRepositorySpy)
  return {
    sut,
    createNotificationRepositorySpy
  }
}

const mockRequest = (): ISendNotification.Params => ({
  category: faker.lorem.word(),
  content: faker.lorem.sentence(),
  recipientId: faker.datatype.uuid()
})

describe('SendNotification', () => {
  it('should call CreateNotificationRepositorySpy with notification', async () => {
    const { sut, createNotificationRepositorySpy } = makeSut()
    const request = mockRequest()

    const { notification } = await sut.send(request)

    expect(createNotificationRepositorySpy.calledTimes).toBe(1)
    expect(createNotificationRepositorySpy.notification).toStrictEqual(notification)
  })

  it('should throw if any dependency throws', async () => {
    const suts: SendNotification[] = [
      new SendNotification({ create: () => throwError() })
    ]
    for (const sut of suts) {
      const request = mockRequest()
      const promise = sut.send(request)
      await expect(promise).rejects.toThrow()
    }
  })
})
