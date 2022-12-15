import {
  PrismaNotificationsRepository,
  PrismaService
} from '@/infra/database/prisma'
import { ICreateNotificationRepository } from '@/services/protocols'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: ICreateNotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [ICreateNotificationRepository]
})
export class DatabaseModule {}
