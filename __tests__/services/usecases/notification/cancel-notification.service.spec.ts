import { NotFoundError } from '@/domain/entities'
import { CancelNotification } from '@/services/usecases'
import { throwError } from '@/tests/domain/mocks'
import {
  FindNotificationByIdRepositorySpy,
  UpdateNotificationRepositorySpy
} from '@/tests/services/mocks/database/mock-notification-repository'
import { faker } from '@faker-js/faker'

interface Sut {
  sut: CancelNotification
  findNotificationByIdRepositorySpy: FindNotificationByIdRepositorySpy
  updateNotificationRepositorySpy: UpdateNotificationRepositorySpy
}

const makeSut = (): Sut => {
  const findNotificationByIdRepositorySpy =
    new FindNotificationByIdRepositorySpy()
  const updateNotificationRepositorySpy = new UpdateNotificationRepositorySpy()
  const sut = new CancelNotification(
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy
  )
  return {
    sut,
    findNotificationByIdRepositorySpy,
    updateNotificationRepositorySpy
  }
}

describe('CancelNotification', () => {
  it('should call FindNotificationByIdNotificationRepository with notification id', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    const notificationId = faker.datatype.uuid()
    await sut.cancel(notificationId)

    expect(findNotificationByIdRepositorySpy.calledTimes).toBe(1)
    expect(findNotificationByIdRepositorySpy.notificationId).toBe(
      notificationId
    )
  })

  it('should throw NotFoundError if no notification was found', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    findNotificationByIdRepositorySpy.notification = null
    const promise = sut.cancel('')

    await expect(promise).rejects.toThrow(new NotFoundError('notification'))
  })

  it('should call cancel notification', async () => {
    const { sut, findNotificationByIdRepositorySpy } = makeSut()

    await sut.cancel('')

    const { canceledAt } = findNotificationByIdRepositorySpy.notification
    expect(canceledAt).toStrictEqual(expect.any(Date))
  })

  it('should call UpdateNotificationRepository with canceled notification', async () => {
    const {
      sut,
      updateNotificationRepositorySpy,
      findNotificationByIdRepositorySpy
    } = makeSut()

    await sut.cancel('')

    expect(updateNotificationRepositorySpy.calledTimes).toBe(1)
    expect(updateNotificationRepositorySpy.notification).toStrictEqual(
      findNotificationByIdRepositorySpy.notification
    )
  })

  it('should throw if any dependency throws', async () => {
    const {
      findNotificationByIdRepositorySpy,
      updateNotificationRepositorySpy
    } = makeSut()
    const suts: CancelNotification[] = [
      new CancelNotification(
        { findById: () => throwError() },
        updateNotificationRepositorySpy
      ),
      new CancelNotification(findNotificationByIdRepositorySpy, {
        update: () => throwError()
      })
    ]
    for (const sut of suts) {
      const promise = sut.cancel('')
      await expect(promise).rejects.toThrow()
    }
  })
})
