import { ICancelNotification } from '@/domain/usecases'
import { IController } from '@/presentation/protocols/controller'
import { Controller, Delete, Param } from '@nestjs/common'

@Controller()
export class CancelNotificationController implements IController {
  constructor(private readonly cancelNotification: ICancelNotification) {}

  @Delete('notification/:notificationId')
  async handle(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.cancel(notificationId)
  }
}
