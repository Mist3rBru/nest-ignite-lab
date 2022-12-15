import { Notification } from '@/domain/entities'

export abstract class ISendNotification {
  abstract send(
    data: ISendNotification.Params
  ): Promise<ISendNotification.Result>
}

export namespace ISendNotification {
  export interface Params {
    recipientId: string
    content: string
    category: string
  }

  export interface Result {
    notification: Notification
  }
}
