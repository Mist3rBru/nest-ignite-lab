import { IReadNotification } from '@/domain/usecases'
import { IController } from '@/presentation/protocols'
import { Controller, Param, Patch } from '@nestjs/common'

@Controller()
export class ReadNotificationController implements IController {
  constructor(private readonly readNotification: IReadNotification) {}

  @Patch('notification/:notificationId/read')
  async handle(@Param('notificationId') notificationId: string) {
    await this.readNotification.read(notificationId)
  }
}
