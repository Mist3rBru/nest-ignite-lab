import { NotFoundError } from '@/domain/entities'

describe('NotFoundError', () => {
  it('should have NotFoundError name', () => {
    const sut = new NotFoundError('param')

    expect(sut.name).toBe('NotFoundError')
  })

  it('should have param not found message', () => {
    const sut = new NotFoundError('param')

    const expected = 'Param not found'
    expect(sut.message).toBe(expected)
  })
})
