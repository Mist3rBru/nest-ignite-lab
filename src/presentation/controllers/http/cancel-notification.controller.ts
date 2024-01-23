import { ICancelNotification } from '@/domain/usecases'
import { type IController } from '@/presentation/protocols'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class CancelNotificationController implements IController {
  constructor(private readonly cancelNotification: ICancelNotification) {}

  @Patch('notification/:notificationId/cancel')
  async handle(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.cancel(notificationId)
  }
}
