import { ISendNotification } from '@/domain/usecases'
import { mockNotification } from '@/tests/domain/mocks'

export class SendNotificationSpy implements ISendNotification {
  calledTimes: number = 0
  params: ISendNotification.Params
  result: ISendNotification.Result = {
    notification: mockNotification()
  }

  async send(
    params: ISendNotification.Params
  ): Promise<ISendNotification.Result> {
    this.calledTimes++
    this.params = params
    return this.result
  }
}
