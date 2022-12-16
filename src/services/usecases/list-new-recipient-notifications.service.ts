import { IListNewRecipientNotifications } from '@/domain/usecases'
import { IFindRecipientNotificationsRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListNewRecipientNotifications
  implements IListNewRecipientNotifications {
  constructor(
    private readonly findRecipientNotificationsRepository: IFindRecipientNotificationsRepository
  ) {}

  async list(
    recipientId: string
  ): Promise<IListNewRecipientNotifications.Result> {
    const notifications =
      await this.findRecipientNotificationsRepository.findRecipientNotifications(
        recipientId
      )

    return {
      notifications: notifications.filter(n => n.isNew)
    }
  }
}
