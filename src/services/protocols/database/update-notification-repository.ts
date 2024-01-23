import { type Notification } from '@/domain/entities'

export abstract class IUpdateNotificationRepository {
  abstract update(notification: Notification): Promise<void>
}
