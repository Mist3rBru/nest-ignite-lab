import { Notification } from '@/domain/entities'
import { NotificationMapper } from '@/domain/mappers/notification-mapper'
import {
  ICreateNotificationRepository,
  IFindNotificationByIdRepository,
  IUpdateNotificationRepository,
  IFindRecipientNotificationsRepository
} from '@/services/protocols'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

interface INotificationRepository
  extends ICreateNotificationRepository,
    IFindNotificationByIdRepository,
    IUpdateNotificationRepository,
    IFindRecipientNotificationsRepository {}

@Injectable()
export class PrismaNotificationsRepository implements INotificationRepository {
  constructor(private readonly db: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = new NotificationMapper(notification).toPrisma()
    await this.db.notification.create({
      data
    })
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const data = await this.db.notification.findUnique({
      where: {
        id: notificationId
      }
    })
    return data ? new Notification(data) : null
  }

  async findRecipientNotifications(recipientId: string): Promise<Notification[]> {
    const data = await this.db.notification.findMany({
      where: {
        recipientId
      }
    })
    return data.map(d => new Notification(d))
  }

  async update(notification: Notification): Promise<void> {
    const data = new NotificationMapper(notification).toPrisma()
    await this.db.notification.update({
      data,
      where: {
        id: data.id
      }
    })
  }
}
