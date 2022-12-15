import { LengthError, NotificationContent } from '@/domain/entities'
import { faker } from '@faker-js/faker'

const makeSut = (msg: string): NotificationContent => {
  return new NotificationContent(msg)
}

describe('ContentEntity', () => {
  it('should create a notification content', async () => {
    const msg = faker.lorem.sentence()

    const sut = makeSut(msg)

    expect(sut).toBeTruthy()
  })

  it('should not create a notification content with less than 5 characters', async () => {
    const msg = '1234'
    const error = new LengthError({
      length: msg.length,
      min: 5,
      max: 240,
      param: 'content'
    })

    expect(() => makeSut(msg)).toThrow(error)
  })

  it('should not create a notification content with more than 240 characters', async () => {
    const msg = 'a'.repeat(241)
    const error = new LengthError({
      length: msg.length,
      min: 5,
      max: 240,
      param: 'content'
    })

    expect(() => makeSut(msg)).toThrow(error)
  })

  it('should return notification content', async () => {
    const content = faker.lorem.sentence()

    const sut = makeSut(content)

    expect(sut.value).toBe(content)
  })
})
