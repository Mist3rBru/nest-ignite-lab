import { Notification } from '@/domain/entities'

export abstract class ICreateNotificationRepository {
  abstract create(data: Notification): Promise<void>
}
