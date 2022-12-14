import { Content, Notification } from '@/domain/entities'
import { ISendNotification } from '@/domain/usecases'
import { INotificationRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SendNotification implements ISendNotification {
  constructor(
    private readonly createNotificationRepository: INotificationRepository
  ) {}

  async send(
    params: ISendNotification.Params
  ): Promise<ISendNotification.Result> {
    const { recipientId, content, category } = params

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category
    })

    await this.createNotificationRepository.create(notification)

    return notification
  }
}
