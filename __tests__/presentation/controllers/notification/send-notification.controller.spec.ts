import { SendNotificationController } from '@/presentation/controllers'
import { SendNotificationBody } from '@/presentation/dtos'
import { throwError } from '@/tests/domain/mocks'
import { SendNotificationSpy } from '@/tests/presentation/mocks/mock-send-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: SendNotificationController
  sendNotificationSpy: SendNotificationSpy
}

const makeSut = (): Sut => {
  const sendNotificationSpy = new SendNotificationSpy()
  const sut = new SendNotificationController(sendNotificationSpy)
  return {
    sut,
    sendNotificationSpy
  }
}

const mockRequest = (): SendNotificationBody => ({
  category: faker.lorem.word(),
  content: faker.lorem.sentence(),
  recipientId: faker.datatype.uuid()
})

describe('SendNotificationController', () => {
  it('should call SendNotification', async () => {
    const { sut, sendNotificationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(sendNotificationSpy.calledTimes).toBe(1)
    expect(sendNotificationSpy.params).toStrictEqual(request)
  })

  it('should return notification', async () => {
    const { sut, sendNotificationSpy } = makeSut()
    const request = mockRequest()

    const { notification } = await sut.handle(request)

    expect(notification).toStrictEqual(sendNotificationSpy.result)
  })

  it('should throw if any dependency throws', async () => {
    const suts: SendNotificationController[] = [
      new SendNotificationController(
        { send: () => throwError() }
      )
    ]
    for (const sut of suts) {
      const request = mockRequest()
      const promise = sut.handle(request)
      await expect(promise).rejects.toThrow()
    }
  })
})
