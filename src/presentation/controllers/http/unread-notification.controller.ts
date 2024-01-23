import { IUnreadNotification } from '@/domain/usecases'
import { type IController } from '@/presentation/protocols'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class UnreadNotificationController implements IController {
  constructor(private readonly unreadNotification: IUnreadNotification) {}

  @Patch('notification/:notificationId/unread')
  async handle(@Param('notificationId') notificationId: string): Promise<void> {
    await this.unreadNotification.unread(notificationId)
  }
}
