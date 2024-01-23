import { Param } from '@/domain/entities'
import { faker } from '@faker-js/faker'

const makeSut = (value: string): Param => {
  return new Param(value)
}

describe('Param', () => {
  it('should return param value', () => {
    const value = faker.lorem.word()
    const sut = makeSut(value)

    expect(sut.value).toBe(value)
  })

  it('should return capitalized param value', () => {
    const sut = makeSut('param')

    expect(sut.capitalizedValue).toBe('Param')
  })
})
