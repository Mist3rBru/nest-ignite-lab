import { LengthError } from '@/domain/entities'
import { NotificationContent } from '@/domain/entities/notification/notification-content'
import { faker } from '@faker-js/faker'

const makeSut = (msg: string): NotificationContent => {
  return new NotificationContent(msg)
}

describe('ContentEntity', () => {
  it('should create a notification content', () => {
    const msg = faker.lorem.sentence()

    const sut = makeSut(msg)

    expect(sut).toBeTruthy()
  })

  it('should not create a notification content with less than 5 characters', () => {
    const msg = '1234'
    const error = new LengthError({
      length: msg.length,
      min: 5,
      max: 240,
      param: 'content',
    })

    expect(() => makeSut(msg)).toThrow(error)
  })

  it('should not create a notification content with more than 240 characters', () => {
    const msg = 'a'.repeat(241)
    const error = new LengthError({
      length: msg.length,
      min: 5,
      max: 240,
      param: 'content',
    })

    expect(() => makeSut(msg)).toThrow(error)
  })

  it('should return notification content', () => {
    const content = faker.lorem.sentence()

    const sut = makeSut(content)

    expect(sut.value).toBe(content)
  })
})
