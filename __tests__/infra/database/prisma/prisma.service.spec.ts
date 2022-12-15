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

  it('should enable shutdown hook', async () => {
    const sut = makeSut()
    const listenerSpy = jest.spyOn(sut, '$on')

    const app: any = { close: jest.fn() }
    await sut.enableShutdownHooks(app)

    expect(listenerSpy).toHaveBeenCalledTimes(1)
    expect(app.close).toHaveBeenCalledTimes(0)
  })

  it('should shutdown database after app closes', async () => {
    const sut = makeSut()

    jest.spyOn(sut, '$on').mockImplementation((_, cb) => {
      cb()()
    })
    const app: any = { close: jest.fn() }
    await sut.$connect()
    await sut.enableShutdownHooks(app)

    expect(app.close).toHaveBeenCalledTimes(1)
  })
})
