import { type Notification } from '@/domain/entities'

export abstract class IListNewRecipientNotifications {
  abstract list(
    recipientId: string,
  ): Promise<IListNewRecipientNotifications.Result>
}

export namespace IListNewRecipientNotifications {
  export interface Result {
    notifications: Notification[]
  }
}
