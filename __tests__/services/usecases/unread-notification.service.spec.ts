import { NotFoundError } from '@/domain/entities'
import { UnreadNotification } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import {
  FindNotificationByIdRepositorySpy,
  UpdateNotificationRepositorySpy,
} from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: UnreadNotification
  findNotificationByIdRepositorySpy: FindNotificationByIdRepositorySpy
  updateNotificationRepositorySpy: UpdateNotificationRepositorySpy
}

const makeSut = (): Sut => {
  const findNotificationByIdRepositorySpy =
    new FindNotificationByIdRepositorySpy()
  const updateNotificationRepositorySpy = new UpdateNotificationRepositorySpy()
  const sut = new UnreadNotification(
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy,
  )

  return {
    sut,
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy,
  }
}

describe('UnreadNotification', () => {
  it('should call FindNotificationByIdNotificationRepository with notification id', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    const notificationId = faker.string.uuid()
    await sut.unread(notificationId)

    expect(findNotificationByIdRepositorySpy.calledTimes).toBe(1)
    expect(findNotificationByIdRepositorySpy.notificationId).toBe(
      notificationId,
    )
  })

  it('should throw NotFoundError if no notification was found', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    findNotificationByIdRepositorySpy.notification = null
    const promise = sut.unread('')

    await expect(promise).rejects.toThrow(new NotFoundError('notification'))
  })

  it('should set notification as unread', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    await sut.unread('')

    const notification = findNotificationByIdRepositorySpy.notification!
    expect(notification.readAt).toBeNull()
  })

  it('should call UpdateNotificationRepository with canceled notification', async () => {
    const {
      sut,
      updateNotificationRepositorySpy,
      findNotificationByIdRepositorySpy,
    } = makeSut()

    await sut.unread('')

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
    const suts: UnreadNotification[] = [
      new UnreadNotification(
        { findById: () => throwError() },
        updateNotificationRepositorySpy,
      ),
      new UnreadNotification(findNotificationByIdRepositorySpy, {
        update: () => throwError(),
      }),
    ]

    for (const sut of suts) {
      const promise = sut.unread('')
      await expect(promise).rejects.toThrow()
    }
  })
})
