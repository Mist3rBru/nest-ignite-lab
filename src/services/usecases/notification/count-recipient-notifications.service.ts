import { ICountRecipientNotifications } from '@/domain/usecases'
import { IFindRecipientNotificationsRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CountRecipientNotifications
  implements ICountRecipientNotifications {
  constructor(
    private readonly findRecipientNotificationsRepository: IFindRecipientNotificationsRepository
  ) {}

  async count(
    recipientId: string
  ): Promise<ICountRecipientNotifications.Result> {
    const notifications =
      await this.findRecipientNotificationsRepository.findRecipientNotifications(
        recipientId
      )

    return {
      count: notifications.length
    }
  }
}
