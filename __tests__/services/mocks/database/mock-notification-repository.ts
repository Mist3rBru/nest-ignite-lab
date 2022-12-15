import { ICreateNotificationRepository } from '@/services/protocols'

export class CreateNotificationRepository
  implements ICreateNotificationRepository {
  calledTimes: number = 0
  params: ICreateNotificationRepository.Params

  async create(params: ICreateNotificationRepository.Params): Promise<void> {
    this.calledTimes++
    this.params = params
  }
}
