import { ReadNotificationController } from '@/presentation/controllers/http'
import { throwError } from '@/tests/domain/mocks'
import { ReadNotificationSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ReadNotificationController
  cancelNotificationSpy: ReadNotificationSpy
}

const makeSut = (): Sut => {
  const cancelNotificationSpy = new ReadNotificationSpy()
  const sut = new ReadNotificationController(cancelNotificationSpy)
  return {
    sut,
    cancelNotificationSpy
  }
}

const mockRequest = (): string => faker.datatype.uuid()

describe('ReadNotificationController', () => {
  it('should call ReadNotification', async () => {
    const { sut, cancelNotificationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(cancelNotificationSpy.calledTimes).toBe(1)
    expect(cancelNotificationSpy.notificationId).toBe(request)
  })

  it('should throw if any dependency throws', async () => {
    const suts: ReadNotificationController[] = [
      new ReadNotificationController({ read: () => throwError() })
    ]
    for (const sut of suts) {
      const request = mockRequest()
      const promise = sut.handle(request)
      await expect(promise).rejects.toThrow()
    }
  })
})
