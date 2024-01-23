import {
  ICreateNotificationRepository,
  IFindNotificationByIdRepository,
  IFindRecipientNotificationsRepository,
  IUpdateNotificationRepository,
} from '@/services/protocols'
import {
  PrismaNotificationsRepository,
  PrismaService,
} from '@/infra/database/prisma'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    PrismaService,
    {
      provide: ICreateNotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: IFindNotificationByIdRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: IUpdateNotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: IFindRecipientNotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    ICreateNotificationRepository,
    IFindNotificationByIdRepository,
    IUpdateNotificationRepository,
    IFindRecipientNotificationsRepository,
  ],
})
export class DatabaseModule {}
