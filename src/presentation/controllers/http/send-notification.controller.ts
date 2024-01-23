import { NotificationMapper } from '@/domain/mappers/notification-mapper'
import { ISendNotification } from '@/domain/usecases'
import { SendNotificationBody } from '@/presentation/dtos'
import { type IController } from '@/presentation/protocols'
import { Body, Controller, Post } from '@nestjs/common'

@Controller()
export class SendNotificationController implements IController {
  constructor(private readonly sendNotification: ISendNotification) {}

  @Post('notification')
  async handle(@Body() body: SendNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.send({
      recipientId,
      content,
      category,
    })

    return {
      notification: new NotificationMapper(notification).toHttp('new'),
    }
  }
}
