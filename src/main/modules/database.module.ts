import {
  PrismaNotificationsRepository,
  PrismaService
} from '@/infra/database/prisma'
import { INotificationRepository } from '@/services/protocols'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [INotificationRepository]
})
export class DatabaseModule {}
