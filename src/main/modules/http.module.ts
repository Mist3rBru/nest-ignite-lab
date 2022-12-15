import { ISendNotification } from '@/domain/usecases'
import { DatabaseModule } from '@/main/modules/database.module'
import { SendNotificationController } from '@/presentation/controllers'
import { SendNotification } from '@/services/usecases'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [SendNotificationController],
  providers: [
    {
      provide: ISendNotification,
      useClass: SendNotification
    }
  ]
})
export class HttpModule {}
