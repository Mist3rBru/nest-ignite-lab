import { KafkaConsumerService } from '@/infra/messaging/kafka/kafka.service'
import { AppModule } from '@/main/modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'

const port = process.env.APP_PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.connectMicroservice<MicroserviceOptions>({
    strategy: await app.get(KafkaConsumerService)
  })

  void app.startAllMicroservices()
  await app.listen(port)
}

bootstrap()
  .then(() => {
    process.stdout.write(`🚀 Server is running on http://localhost:${port}\n`)
  })
  .catch(err => {
    console.error(err)
  })
