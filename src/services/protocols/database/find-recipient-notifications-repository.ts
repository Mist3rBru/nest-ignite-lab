import { Notification } from '@/domain/entities'

export abstract class IFindRecipientNotificationsRepository {
  abstract findRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]>
}
