import {
  ICancelNotification,
  ICountRecipientNotifications,
  IListNewRecipientNotifications,
  IListRecipientNotifications,
  IReadNotification,
  ISendNotification,
  IUnreadNotification,
} from '@/domain/usecases'
import {
  CancelNotificationController,
  CountRecipientNotificationsController,
  ListNewRecipientNotificationsController,
  ListRecipientNotificationsController,
  ReadNotificationController,
  SendNotificationController,
  UnreadNotificationController,
} from '@/presentation/controllers/http'
import {
  CancelNotification,
  CountRecipientNotifications,
  ListNewRecipientNotifications,
  ListRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@/services/usecases'
import { DatabaseModule } from '@/main/modules/database.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendNotificationController,
    CancelNotificationController,
    CountRecipientNotificationsController,
    ReadNotificationController,
    UnreadNotificationController,
    ListRecipientNotificationsController,
    ListNewRecipientNotificationsController,
  ],
  providers: [
    {
      provide: ISendNotification,
      useClass: SendNotification,
    },
    {
      provide: ICancelNotification,
      useClass: CancelNotification,
    },
    {
      provide: ICountRecipientNotifications,
      useClass: CountRecipientNotifications,
    },
    {
      provide: IReadNotification,
      useClass: ReadNotification,
    },
    {
      provide: IUnreadNotification,
      useClass: UnreadNotification,
    },
    {
      provide: IUnreadNotification,
      useClass: UnreadNotification,
    },
    {
      provide: IListRecipientNotifications,
      useClass: ListRecipientNotifications,
    },
    {
      provide: IListNewRecipientNotifications,
      useClass: ListNewRecipientNotifications,
    },
  ],
})
export class HttpModule {}
