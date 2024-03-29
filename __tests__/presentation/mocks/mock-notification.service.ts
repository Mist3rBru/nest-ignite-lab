import {
  type ICancelNotification,
  type ICountRecipientNotifications,
  type IListRecipientNotifications,
  type IReadNotification,
  type ISendNotification,
  type IUnreadNotification,
} from '@/domain/usecases'
import { mockNotification } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class SendNotificationSpy implements ISendNotification {
  calledTimes: number = 0
  params: ISendNotification.Params
  result: ISendNotification.Result = {
    notification: mockNotification(),
  }

  async send(
    params: ISendNotification.Params,
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

export class UnreadNotificationSpy implements IUnreadNotification {
  calledTimes: number = 0
  notificationId: string

  async unread(notificationId: string): Promise<void> {
    this.calledTimes++
    this.notificationId = notificationId
  }
}

export class CountRecipientNotificationsSpy
  implements ICountRecipientNotifications
{
  calledTimes: number = 0
  recipientId: string
  result: ICountRecipientNotifications.Result = {
    count: faker.number.int(),
  }

  async count(
    recipientId: string,
  ): Promise<ICountRecipientNotifications.Result> {
    this.calledTimes++
    this.recipientId = recipientId

    return this.result
  }
}

export class ListRecipientNotificationsSpy
  implements IListRecipientNotifications
{
  calledTimes: number = 0
  recipientId: string
  result: IListRecipientNotifications.Result = {
    notifications: [mockNotification()],
  }

  async list(recipientId: string): Promise<IListRecipientNotifications.Result> {
    this.calledTimes++
    this.recipientId = recipientId

    return this.result
  }
}
