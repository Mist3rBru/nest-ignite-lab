import { Notification } from '@/domain/entities'
import { ISendNotification } from '@/domain/usecases'
import { ICreateNotificationRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SendNotification implements ISendNotification {
  constructor(
    private readonly createNotificationRepository: ICreateNotificationRepository
  ) {}

  async send(
    params: ISendNotification.Params
  ): Promise<ISendNotification.Result> {
    const { recipientId, content, category } = params

    const notification = new Notification({
      recipientId,
      content,
      category
    })

    await this.createNotificationRepository.create(notification)

    return {
      notification
    }
  }
}
