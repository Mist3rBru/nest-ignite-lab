import { Notification } from '@/domain/entities'
import { faker } from '@faker-js/faker'

const makeSut = (props: Notification.Params): Notification => {
  return new Notification(props)
}

const mockProps = (): Notification.Params => ({
  id: faker.datatype.uuid(),
  category: faker.lorem.word(),
  content: faker.lorem.sentence(),
  recipientId: faker.datatype.uuid(),
  createdAt: new Date(),
  readAt: new Date(),
  canceledAt: new Date()
})

describe('Notification', () => {
  it('should create a notification', () => {
    const props = mockProps()
    const sut = makeSut(props)

    expect(sut).toBeTruthy()
  })

  it('should define undefined props', () => {
    const props = mockProps()
    props.id = undefined
    props.readAt = undefined
    props.canceledAt = undefined
    props.createdAt = undefined

    const sut = makeSut(props)

    expect(sut.id).toStrictEqual(expect.any(String))
    expect(sut.readAt).toBeNull()
    expect(sut.canceledAt).toBeNull()
    expect(sut.createdAt).toStrictEqual(expect.any(Date))
  })

  it('should get notification props', () => {
    const props = mockProps()

    const sut = makeSut(props)

    expect(sut.id).toStrictEqual(props.id)
    expect(sut.category).toStrictEqual(props.category)
    expect(sut.content).toStrictEqual(props.content)
    expect(sut.recipientId).toStrictEqual(props.recipientId)
    expect(sut.readAt).toStrictEqual(props.readAt)
    expect(sut.canceledAt).toStrictEqual(props.canceledAt)
    expect(sut.createdAt).toStrictEqual(props.createdAt)
  })

  it('should set new notification props', () => {
    const props = mockProps()

    const sut = makeSut(props)

    const newProps = mockProps()
    sut.category = newProps.category
    sut.content = newProps.content
    sut.recipientId = newProps.recipientId
    sut.readAt = newProps.readAt as Date

    expect(sut.category).toStrictEqual(newProps.category)
    expect(sut.content).toStrictEqual(newProps.content)
    expect(sut.recipientId).toStrictEqual(newProps.recipientId)
    expect(sut.readAt).toStrictEqual(newProps.readAt)
  })

  it('should soft cancel notification', () => {
    const props = mockProps()

    const sut = makeSut(props)
    sut.cancel()

    expect(sut.canceledAt).toStrictEqual(expect.any(Date))
  })
})
