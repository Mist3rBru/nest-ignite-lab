import { NotificationMapper } from '@/domain/mappers'
import { IListNewRecipientNotifications } from '@/domain/usecases'
import { type IController } from '@/presentation/protocols'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class ListNewRecipientNotificationsController implements IController {
  constructor(
    private readonly listNewRecipientNotifications: IListNewRecipientNotifications,
  ) {}

  @Get('notifications/:recipientId/new')
  async handle(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.listNewRecipientNotifications.list(recipientId)

    return {
      notifications: notifications.map(n =>
        new NotificationMapper(n).toHttp('new'),
      ),
    }
  }
}
