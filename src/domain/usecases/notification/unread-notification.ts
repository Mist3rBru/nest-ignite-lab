export abstract class IUnreadNotification {
  abstract unread(notificationId: string): Promise<void>
}
