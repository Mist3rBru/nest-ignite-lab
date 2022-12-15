export abstract class ICancelNotification {
  abstract cancel(notificationId: string): Promise<void>
}
