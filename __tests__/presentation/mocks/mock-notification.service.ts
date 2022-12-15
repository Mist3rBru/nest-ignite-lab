import { ICancelNotification, IReadNotification, ISendNotification } from '@/domain/usecases'
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

export class CancelNotificationSpy implements ICancelNotification {
  calledTimes: number = 0
  notificationId: string

  async cancel(notificationId: string): Promise<void> {
    this.calledTimes++
    this.notificationId = notificationId
  }
}

export class ReadNotificationSpy implements IReadNotification {
  calledTimes: number = 0
  notificationId: string

  async read(notificationId: string): Promise<void> {
    this.calledTimes++
    this.notificationId = notificationId
  }
}
