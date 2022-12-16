import { Notification } from '@/domain/entities'
import { Notification as PrismaNotification } from '@prisma/client'

export class NotificationMapper {
  constructor(private readonly props: Notification) {}

  public toPrisma(): PrismaNotification {
    return {
      id: this.props.id,
      recipientId: this.props.recipientId,
      category: this.props.category,
      content: this.props.content,
      readAt: this.props.readAt,
      canceledAt: this.props.canceledAt,
      createdAt: this.props.createdAt
    }
  }

  public toHTTP(isNew?: boolean) {
    const http = {
      id: this.props.id,
      recipientId: this.props.recipientId,
      category: this.props.category,
      content: this.props.content
    }
    if (!isNew) {
      Object.assign(http, {
        readAt: this.props.readAt,
        canceledAt: this.props.canceledAt
      })
    }
    return http
  }
}
