import { NotificationMapper } from '@/domain/mappers'
import { IListRecipientNotifications } from '@/domain/usecases'
import { IController } from '@/presentation/protocols'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class ListRecipientNotificationsController implements IController {
  constructor(
    private readonly listRecipientNotifications: IListRecipientNotifications
  ) {}

  @Get('notifications/:recipientId')
  async handle(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.listRecipientNotifications.list(
      recipientId
    )

    return {
      notifications: notifications.map(n => new NotificationMapper(n).toHttp())
    }
  }
}
