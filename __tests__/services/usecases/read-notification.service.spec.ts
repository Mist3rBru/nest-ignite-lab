import { NotFoundError } from '@/domain/entities'
import { ReadNotification } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import {
  FindNotificationByIdRepositorySpy,
  UpdateNotificationRepositorySpy,
} from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: ReadNotification
  findNotificationByIdRepositorySpy: FindNotificationByIdRepositorySpy
  updateNotificationRepositorySpy: UpdateNotificationRepositorySpy
}

const makeSut = (): Sut => {
  const findNotificationByIdRepositorySpy =
    new FindNotificationByIdRepositorySpy()
  const updateNotificationRepositorySpy = new UpdateNotificationRepositorySpy()
  const sut = new ReadNotification(
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy,
  )

  return {
    sut,
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy,
  }
}

describe('ReadNotification', () => {
  it('should call FindNotificationByIdNotificationRepository with notification id', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    const notificationId = faker.string.uuid()
    await sut.read(notificationId)

    expect(findNotificationByIdRepositorySpy.calledTimes).toBe(1)
    expect(findNotificationByIdRepositorySpy.notificationId).toBe(
      notificationId,
    )
  })

  it('should throw NotFoundError if no notification was found', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    findNotificationByIdRepositorySpy.notification = null
    const promise = sut.read('')

    await expect(promise).rejects.toThrow(new NotFoundError('notification'))
  })

  it('should set notification as read', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    await sut.read('')

    const notification = findNotificationByIdRepositorySpy.notification!
    expect(notification.readAt).toStrictEqual(expect.any(Date))
  })

  it('should call UpdateNotificationRepository with canceled notification', async () => {
    const {
      sut,
      updateNotificationRepositorySpy,
      findNotificationByIdRepositorySpy,
    } = makeSut()

    await sut.read('')

    expect(updateNotificationRepositorySpy.calledTimes).toBe(1)
    expect(updateNotificationRepositorySpy.notification).toStrictEqual(
      findNotificationByIdRepositorySpy.notification,
    )
  })

  it('should throw if any dependency throws', async () => {
    const {
      findNotificationByIdRepositorySpy,
      updateNotificationRepositorySpy,
    } = makeSut()
    const suts: ReadNotification[] = [
      new ReadNotification(
        { findById: () => throwError() },
        updateNotificationRepositorySpy,
      ),
      new ReadNotification(findNotificationByIdRepositorySpy, {
        update: () => throwError(),
      }),
    ]

    for (const sut of suts) {
      const promise = sut.read('')
      await expect(promise).rejects.toThrow()
    }
  })
})
