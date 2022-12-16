import { NotFoundError } from '@/domain/entities'
import { IUnreadNotification } from '@/domain/usecases'
import {
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository
} from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UnreadNotification implements IUnreadNotification {
  constructor(
    private readonly findNotificationByIdRepository: IFindNotificationByIdRepository,
    private readonly updateNotificationRepository: IUpdateNotificationRepository
  ) {}

  async unread(notificationId: string): Promise<void> {
    const notification = await this.findNotificationByIdRepository.findById(
      notificationId
    )

    if (!notification) {
      throw new NotFoundError('notification')
    }

    notification.unread()

    await this.updateNotificationRepository.update(notification)
  }
}
