import { PrismaService } from '@/infra/database/prisma'
import { AppModule } from '@/main/modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const prisma = app.get(PrismaService)
  await prisma.onModuleInit()
  await prisma.enableShutdownHooks(app)

  await app.listen(3000)
}

bootstrap()
  .then(() => {
    process.stdout.write('🚀 Server is running on http://localhost:3000\n')
  })
  .catch(err => {
    console.error(err)
  })
