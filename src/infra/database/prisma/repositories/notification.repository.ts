import { Notification } from '@/domain/entities'
import { NotificationMapper } from '@/domain/mappers/notification-mapper'
import { ICreateNotificationRepository } from '@/services/protocols'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

interface INotificationRepository extends ICreateNotificationRepository {}

@Injectable()
export class PrismaNotificationsRepository implements INotificationRepository {
  constructor(private readonly db: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = new NotificationMapper(notification).toPrisma()
    await this.db.notification.create({
      data
    })
  }
}
