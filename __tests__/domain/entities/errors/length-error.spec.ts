import { LengthError } from '@/domain/entities'

const makeSut = (props: LengthError.Props): LengthError => {
  return new LengthError(props)
}

const mockProps = (length: number): LengthError.Props => ({
  param: 'param',
  length,
  min: 1,
  max: 5
})

describe('LengthError', () => {
  it('should have LengthError name', () => {
    const props = mockProps(0)
    const sut = makeSut(props)

    expect(sut.name).toBe('LengthError')
  })

  it('should return max length exceeded', () => {
    const props = mockProps(6)
    const sut = makeSut(props)

    const expected = `Param must be lower than ${props.max}`
    expect(sut.message).toBe(expected)
  })

  it('should return min length not attended', () => {
    const props = mockProps(0)
    const sut = makeSut(props)

    const expected = `Param must be higher than ${props.min}`
    expect(sut.message).toBe(expected)
  })

  it('should return min length not attended even if no max length is provided', () => {
    const props = mockProps(0)
    props.max = undefined
    const sut = makeSut(props)

    const expected = `Param must be higher than ${props.min}`
    expect(sut.message).toBe(expected)
  })
})
