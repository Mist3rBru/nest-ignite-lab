export abstract class ICountRecipientNotifications {
  abstract count(
    recipientId: string,
  ): Promise<ICountRecipientNotifications.Result>
}

export namespace ICountRecipientNotifications {
  export interface Result {
    count: number
  }
}
