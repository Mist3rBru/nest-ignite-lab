import { KafkaConsumerService } from '@/infra/messaging/kafka/kafka.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [KafkaConsumerService]
})
export class MessagingModule {}
