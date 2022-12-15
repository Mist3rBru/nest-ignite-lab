import {
  PrismaNotificationsRepository,
  PrismaService
} from '@/infra/database/prisma'
import {
  ICreateNotificationRepository,
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository
} from '@/services/protocols'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: ICreateNotificationRepository,
      useClass: PrismaNotificationsRepository
    },
    {
      provide: IFindNotificationByIdRepository,
      useClass: PrismaNotificationsRepository
    },
    {
      provide: IUpdateNotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [
    PrismaService,
    ICreateNotificationRepository,
    IFindNotificationByIdRepository,
    IUpdateNotificationRepository
  ]
})
export class DatabaseModule {}
