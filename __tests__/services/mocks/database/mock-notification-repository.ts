import { Notification } from '@/domain/entities'
import {
  ICreateNotificationRepository,
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository
} from '@/services/protocols'
import { mockNotification } from '@/tests/domain/mocks'

export class CreateNotificationRepositorySpy
  implements ICreateNotificationRepository {
  calledTimes: number = 0
  notification: Notification

  async create(notification: Notification): Promise<void> {
    this.calledTimes++
    this.notification = notification
  }
}

export class UpdateNotificationRepositorySpy
  implements IUpdateNotificationRepository {
  calledTimes: number = 0
  notification: Notification

  async update(notification: Notification): Promise<void> {
    this.calledTimes++
    this.notification = notification
  }
}

export class FindNotificationByIdRepositorySpy
  implements IFindNotificationByIdRepository {
  calledTimes: number = 0
  notificationId: string
  notification: Notification = mockNotification()

  async findById(notificationId: string): Promise<Notification> {
    this.calledTimes++
    this.notificationId = notificationId
    return this.notification
  }
}
