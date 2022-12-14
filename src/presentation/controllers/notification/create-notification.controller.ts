import { ISendNotification } from '@/domain/usecases'
import { CreateNotificationBody } from '@/presentation/dtos'
import { Body, Controller, Post } from '@nestjs/common'

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: ISendNotification) {}

  @Post('notification')
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const notification = await this.sendNotification.send({
      recipientId,
      content,
      category
    })

    return { notification }
  }
}
