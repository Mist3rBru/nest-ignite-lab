import { type Notification } from '@/domain/entities'
import { type Notification as PrismaNotification } from '@prisma/client'

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
      createdAt: this.props.createdAt,
    }
  }

  public toHttp(type?: NotificationMapper.ToHttpTypes) {
    const http = {
      id: this.props.id,
      recipientId: this.props.recipientId,
      category: this.props.category,
      content: this.props.content,
      createdAt: this.props.createdAt,
    }

    switch (type) {
      case 'new':
        break
      default:
        Object.assign(http, {
          readAt: this.props.readAt,
          canceledAt: this.props.canceledAt,
        })
    }

    return http
  }
}

export namespace NotificationMapper {
  export type ToHttpTypes = 'new'
}
