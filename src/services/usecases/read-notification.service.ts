import { NotFoundError } from '@/domain/entities'
import { IReadNotification } from '@/domain/usecases'
import {
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository
} from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReadNotification implements IReadNotification {
  constructor(
    private readonly findNotificationByIdRepository: IFindNotificationByIdRepository,
    private readonly updateNotificationRepository: IUpdateNotificationRepository
  ) {}

  async read(notificationId: string): Promise<void> {
    const notification = await this.findNotificationByIdRepository.findById(
      notificationId
    )

    if (!notification) {
      throw new NotFoundError('notification')
    }

    notification.read()

    await this.updateNotificationRepository.update(notification)
  }
}
