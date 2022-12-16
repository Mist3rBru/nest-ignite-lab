import { ICountRecipientNotifications } from '@/domain/usecases'
import { IController } from '@/presentation/protocols'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class CountRecipientNotificationsController implements IController {
  constructor(
    private readonly countRecipientNotifications: ICountRecipientNotifications
  ) {}

  @Get('notifications/:recipientId/count')
  async handle(@Param('recipientId') recipientId: string) {
    const result = await this.countRecipientNotifications.count(recipientId)

    return {
      count: result.count
    }
  }
}
