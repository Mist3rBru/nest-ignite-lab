import { ISendNotification } from '@/domain/usecases'
import { SendNotificationBody } from '@/presentation/dtos'
import { IController } from '@/presentation/protocols'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

@Controller()
export class SendNotificationController implements IController {
  constructor(private readonly sendNotification: ISendNotification) {}

  @EventPattern('notifications.send-notification')
  async handle(@Payload() payload: SendNotificationBody) {
    const { recipientId, content, category } = payload

    await this.sendNotification.send({
      recipientId,
      content,
      category
    })
  }
}
