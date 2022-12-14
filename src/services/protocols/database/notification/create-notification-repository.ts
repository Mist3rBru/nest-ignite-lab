import { Notification } from '@/domain/entities'

export abstract class INotificationRepository {
  abstract create(notification: Notification): Promise<void>
}
