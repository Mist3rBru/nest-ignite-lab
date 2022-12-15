import { IReadNotification } from '@/domain/usecases'
import { IController } from '@/presentation/protocols/controller'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class ReadNotificationController implements IController {
  constructor(private readonly cancelNotification: IReadNotification) {}

  @Patch('notification/:notificationId/cancel')
  async handle(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.read(notificationId)
  }
}
