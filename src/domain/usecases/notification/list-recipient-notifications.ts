import { Notification } from '@/domain/entities'

export abstract class IListRecipientNotifications {
  abstract list(
    recipientId: string
  ): Promise<IListRecipientNotifications.Result>
}

export namespace IListRecipientNotifications {
  export interface Result {
    notifications: Notification[]
  }
}
