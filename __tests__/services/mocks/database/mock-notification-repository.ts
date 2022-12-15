import { Notification } from '@/domain/entities'
import {
  ICreateNotificationRepository,
  IFindNotificationByIdRepository,
  IFindRecipientNotificationsRepository,
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
  notification: Notification | null = mockNotification()

  async findById(notificationId: string): Promise<Notification | null> {
    this.calledTimes++
    this.notificationId = notificationId
    return this.notification
  }
}

export class FindRecipientNotificationsRepositorySpy
  implements IFindRecipientNotificationsRepository {
  calledTimes: number = 0
  recipientId: string
  notifications: Notification[] = [mockNotification()]

  async findRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]> {
    this.calledTimes++
    this.recipientId = recipientId
    return this.notifications
  }
}
