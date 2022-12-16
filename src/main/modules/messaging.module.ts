import { ISendNotification } from '@/domain/usecases'
import { KafkaConsumerService } from '@/infra/messaging/kafka'
import { DatabaseModule } from '@/main/modules'
import { SendNotificationController } from '@/presentation/controllers/messaging'
import { SendNotification } from '@/services/usecases'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [SendNotificationController],
  providers: [
    KafkaConsumerService,
    {
      provide: ISendNotification,
      useClass: SendNotification
    }
  ]
})
export class MessagingModule {}
