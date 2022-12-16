import { NotificationMapper } from '@/domain/mappers'
import {
  PrismaNotificationsRepository,
  PrismaService
} from '@/infra/database/prisma'
import { mockNotification } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'
import { Test } from '@nestjs/testing'

const makeSut = async (): Promise<PrismaNotificationsRepository> => {
  const moduleRef = await Test.createTestingModule({
    providers: [PrismaNotificationsRepository, PrismaService]
  }).compile()

  return await moduleRef.get(PrismaNotificationsRepository)
}

describe('PrismaNotificationRepository', () => {
  const db = new PrismaService()

  beforeAll(async () => {
    await db.notification.deleteMany()
  })

  afterEach(async () => {
    await db.notification.deleteMany()
  })

  describe('create()', () => {
    it('should create a notification register', async () => {
      const sut = await makeSut()
      const data = mockNotification()

      await sut.create(data)
      const result = await db.notification.findUnique({
        where: {
          id: data.id
        }
      })

      const expected = new NotificationMapper(data).toPrisma()
      expect(result).toStrictEqual(expected)
    })
  })

  describe('findById()', () => {
    it('should find notification', async () => {
      const sut = await makeSut()
      const data = mockNotification()

      await db.notification.create({
        data: new NotificationMapper(data).toPrisma()
      })
      const result = await sut.findById(data.id)

      expect(result).toStrictEqual(data)
    })

    it('should return null if no notification was found', async () => {
      const sut = await makeSut()

      const result = await sut.findById('')

      expect(result).toBeNull()
    })
  })

  describe('findRecipientNotifications()', () => {
    it('should find recipient notifications', async () => {
      const sut = await makeSut()
      const recipientId = faker.datatype.uuid()

      await db.notification.create({
        data: new NotificationMapper(
          mockNotification({ recipientId })
        ).toPrisma()
      })
      await db.notification.create({
        data: new NotificationMapper(
          mockNotification({ recipientId })
        ).toPrisma()
      })
      const result = await sut.findRecipientNotifications(recipientId)

      expect(result).toHaveLength(2)
    })

    it('should return empthy if no notification was found', async () => {
      const sut = await makeSut()

      const result = await sut.findRecipientNotifications('')

      expect(result).toHaveLength(0)
    })
  })

  describe('update()', () => {
    it('should update a notification', async () => {
      const sut = await makeSut()
      const data = new NotificationMapper(mockNotification()).toPrisma()
      const newData = mockNotification()

      data.id = newData.id
      await db.notification.create({
        data
      })
      await sut.update(newData)

      const result = await db.notification.findUnique({
        where: {
          id: data.id
        }
      })

      const expected = new NotificationMapper(newData).toPrisma()
      expect(result).toStrictEqual(expected)
    })
  })
})
