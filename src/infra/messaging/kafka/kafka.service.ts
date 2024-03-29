import { Injectable, type OnModuleDestroy } from '@nestjs/common'
import { ServerKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: process.env.KAFKA_ID,
        brokers: [process.env.KAFKA_BROKER],
        retry: {
          initialRetryTime: Number.parseInt(process.env.KAFKA_RETRY_TIME),
          retries: Number.parseInt(process.env.KAFKA_RETRY_TIMES),
        },
      },
    })
  }

  async onModuleDestroy(): Promise<void> {
    await this.close()
  }
}
