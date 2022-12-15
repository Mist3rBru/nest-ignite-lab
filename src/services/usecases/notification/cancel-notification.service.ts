import { ICancelNotification } from '@/domain/usecases'
import {
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository
} from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CancelNotification implements ICancelNotification {
  constructor(
    private readonly findNotificationByIdRepository: IFindNotificationByIdRepository,
    private readonly updateNotificationRepository: IUpdateNotificationRepository
  ) {}

  async cancel(notificationId: string): Promise<void> {
    const notification = await this.findNotificationByIdRepository.findById(
      notificationId
    )

    notification.cancel()

    await this.updateNotificationRepository.update(notification)
  }
}
