import { KafkaConsumerService } from '@/infra/messaging/kafka/kafka.service'
import { AppModule } from '@/main/modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.connectMicroservice<MicroserviceOptions>({
    strategy: await app.get(KafkaConsumerService)
  })

  await app.listen(process.env.APP_PORT)
}

bootstrap()
  .then(() => {
    process.stdout.write(
      `🚀 Server is running on http://localhost:${process.env.APP_PORT}\n`
    )
  })
  .catch(err => {
    console.error(err)
  })
