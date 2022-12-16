import {
  ICancelNotification,
  ICountRecipientNotifications,
  IReadNotification,
  ISendNotification,
  IUnreadNotification
} from '@/domain/usecases'
import { DatabaseModule } from '@/main/modules/database.module'
import {
  CancelNotificationController,
  CountRecipientNotificationsController,
  ReadNotificationController,
  SendNotificationController,
  UnreadNotificationController
} from '@/presentation/controllers'
import {
  CancelNotification,
  CountRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification
} from '@/services/usecases'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendNotificationController,
    CancelNotificationController,
    CountRecipientNotificationsController,
    ReadNotificationController,
    UnreadNotificationController
  ],
  providers: [
    {
      provide: ISendNotification,
      useClass: SendNotification
    },
    {
      provide: ICancelNotification,
      useClass: CancelNotification
    },
    {
      provide: ICountRecipientNotifications,
      useClass: CountRecipientNotifications
    },
    {
      provide: IReadNotification,
      useClass: ReadNotification
    },
    {
      provide: IUnreadNotification,
      useClass: UnreadNotification
    },
    {
      provide: IUnreadNotification,
      useClass: UnreadNotification
    }
  ]
})
export class HttpModule {}
