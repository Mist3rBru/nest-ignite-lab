import { Notification } from '@/domain/entities'

export abstract class ICreateNotificationRepository {
  abstract create(data: ICreateNotificationRepository.Params): Promise<void>
}

export namespace ICreateNotificationRepository {
  export type Params = Notification
}
