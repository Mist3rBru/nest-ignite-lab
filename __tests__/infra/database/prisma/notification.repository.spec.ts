import {
  PrismaNotificationsRepository,
  PrismaService
} from '@/infra/database/prisma'
import { ICreateNotificationRepository } from '@/services/protocols'
import { mockNotification } from '@/tests/domain/mocks'
import { Test } from '@nestjs/testing'
interface Sut {
  sut: PrismaNotificationsRepository
  db: PrismaService
}

const makeSut = async (): Promise<Sut> => {
  const moduleRef = await Test.createTestingModule({
    providers: [PrismaNotificationsRepository, PrismaService]
  }).compile()

  return {
    sut: moduleRef.get(PrismaNotificationsRepository),
    db: moduleRef.get(PrismaService)
  }
}

const mockRequest = (): ICreateNotificationRepository.Params =>
  mockNotification()

describe('PrismaNotificationRepository', () => {
  describe('create()', () => {
    it('should create a notification register', async () => {
      const { sut, db } = await makeSut()
      const request = mockRequest()

      await sut.create(request)
      const notification = await db.notification.findUnique({
        where: {
          id: request.id
        }
      })

      expect(notification).toStrictEqual({
        id: request.id,
        recipientId: request.recipientId,
        category: request.category,
        content: request.content,
        readAt: request.readAt,
        createdAt: request.createdAt
      })
    })
  })
})
