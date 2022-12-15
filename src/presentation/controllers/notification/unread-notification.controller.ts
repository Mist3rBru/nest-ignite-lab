import { IUnreadNotification } from '@/domain/usecases'
import { IController } from '@/presentation/protocols/controller'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class UnreadNotificationController implements IController {
  constructor(private readonly unreadNotification: IUnreadNotification) {}

  @Patch('notification/:notificationId/unread')
  async handle(@Param('notificationId') notificationId: string) {
    await this.unreadNotification.unread(notificationId)
  }
}
