import { Notification } from '@/domain/entities'
import { ICreateNotificationRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

interface INotificationRepository extends ICreateNotificationRepository {}

@Injectable()
export class PrismaNotificationsRepository implements INotificationRepository {
  constructor(private readonly db: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.db.notification.create({
      data: {
        id: notification.id,
        content: notification.content,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt
      }
    })
  }
}
