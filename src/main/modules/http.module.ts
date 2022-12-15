import { ICancelNotification, ISendNotification } from '@/domain/usecases'
import { DatabaseModule } from '@/main/modules/database.module'
import { CancelNotificationController, SendNotificationController } from '@/presentation/controllers'
import { CancelNotification, SendNotification } from '@/services/usecases'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [SendNotificationController, CancelNotificationController],
  providers: [
    {
      provide: ISendNotification,
      useClass: SendNotification
    },
    {
      provide: ICancelNotification,
      useClass: CancelNotification
    }
  ]
})
export class HttpModule {}
