import { UnreadNotificationController } from '@/presentation/controllers/http'
import { throwError } from '@/tests/domain/mocks'
import { UnreadNotificationSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: UnreadNotificationController
  cancelNotificationSpy: UnreadNotificationSpy
}

const makeSut = (): Sut => {
  const cancelNotificationSpy = new UnreadNotificationSpy()
  const sut = new UnreadNotificationController(cancelNotificationSpy)
  return {
    sut,
    cancelNotificationSpy
  }
}

const mockRequest = (): string => faker.datatype.uuid()

describe('UnreadNotificationController', () => {
  it('should call UnreadNotification', async () => {
    const { sut, cancelNotificationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(cancelNotificationSpy.calledTimes).toBe(1)
    expect(cancelNotificationSpy.notificationId).toBe(request)
  })

  it('should throw if any dependency throws', async () => {
    const suts: UnreadNotificationController[] = [
      new UnreadNotificationController({ unread: () => throwError() })
    ]
    for (const sut of suts) {
      const request = mockRequest()
      const promise = sut.handle(request)
      await expect(promise).rejects.toThrow()
    }
  })
})
