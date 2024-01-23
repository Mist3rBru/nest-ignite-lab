import { PrismaService } from '@/infra/database/prisma'

const makeSut = (): PrismaService => {
  return new PrismaService()
}

describe('PrismaService', () => {
  it('should connect to database', async () => {
    const sut = makeSut()
    const connectSpy = jest.spyOn(sut, '$connect')

    await sut.onModuleInit()

    expect(connectSpy).toHaveBeenCalledTimes(1)
  })

})
