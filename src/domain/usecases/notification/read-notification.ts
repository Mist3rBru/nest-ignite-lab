export abstract class IReadNotification {
  abstract read(notificationId: string): Promise<void>
}
