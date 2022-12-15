import { Notification } from '@/domain/entities'

export abstract class IFindNotificationByIdRepository {
  abstract findById(notificationId: string): Promise<Notification | null>
}
