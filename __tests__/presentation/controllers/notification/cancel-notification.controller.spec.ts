import { CancelNotificationController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { CancelNotificationSpy } from '@/tests/presentation/mocks/mock-notification.service'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: CancelNotificationController
  cancelNotificationSpy: CancelNotificationSpy
}

const makeSut = (): Sut => {
  const cancelNotificationSpy = new CancelNotificationSpy()
  const sut = new CancelNotificationController(cancelNotificationSpy)
  return {
    sut,
    cancelNotificationSpy
  }
}

const mockRequest = (): string => faker.datatype.uuid()

describe('CancelNotificationController', () => {
  it('should call CancelNotification', async () => {
    const { sut, cancelNotificationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(cancelNotificationSpy.calledTimes).toBe(1)
    expect(cancelNotificationSpy.notificationId).toBe(request)
  })

  it('should throw if any dependency throws', async () => {
    const suts: CancelNotificationController[] = [
      new CancelNotificationController({ cancel: () => throwError() })
    ]
    for (const sut of suts) {
      const request = mockRequest()
      const promise = sut.handle(request)
      await expect(promise).rejects.toThrow()
    }
  })
})
