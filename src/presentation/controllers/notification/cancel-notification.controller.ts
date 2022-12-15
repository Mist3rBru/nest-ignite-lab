import { ICancelNotification } from '@/domain/usecases'
import { IController } from '@/presentation/protocols/controller'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class CancelNotificationController implements IController {
  constructor(private readonly cancelNotification: ICancelNotification) {}

  @Patch('notification/:notificationId/cancel')
  async handle(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.cancel(notificationId)
  }
}
