import { type IListRecipientNotifications } from '@/domain/usecases'
import { IFindRecipientNotificationsRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListRecipientNotifications implements IListRecipientNotifications {
  constructor(
    private readonly findRecipientNotificationsRepository: IFindRecipientNotificationsRepository,
  ) {}

  async list(recipientId: string): Promise<IListRecipientNotifications.Result> {
    const notifications =
      await this.findRecipientNotificationsRepository.findRecipientNotifications(
        recipientId,
      )

    return {
      notifications,
    }
  }
}
