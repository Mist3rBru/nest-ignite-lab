import { Notification, NotificationProps, Replace } from '@/domain/entities'
import { faker } from '@faker-js/faker'

const makeSut = (
  props: Replace<NotificationProps, { createdAt?: Date }>
): Notification => {
  return new Notification(props)
}

const mockProps = (): Replace<NotificationProps, { createdAt?: Date }> => ({
  category: faker.lorem.word(),
  content: faker.lorem.sentence(),
  recipientId: faker.datatype.uuid(),
  createdAt: new Date(),
  readAt: new Date()
})

describe('Notification', () => {
  it('should create a notification', () => {
    const props = mockProps()
    const sut = makeSut(props)

    expect(sut).toBeTruthy()
  })

  it('should define id', () => {
    const props = mockProps()
    const sut = makeSut(props)

    expect(sut.id).toStrictEqual(expect.any(String))
  })

  it('should define created at', () => {
    const props = mockProps()
    props.createdAt = undefined
    const sut = makeSut(props)

    expect(sut.createdAt).toStrictEqual(expect.any(Date))
  })

  it('should get notification props', () => {
    const props = mockProps()
    const sut = makeSut(props)

    expect(sut.category).toStrictEqual(props.category)
    expect(sut.content).toStrictEqual(props.content)
    expect(sut.recipientId).toStrictEqual(props.recipientId)
    expect(sut.readAt).toStrictEqual(props.readAt)
    expect(sut.createdAt).toStrictEqual(props.createdAt)
  })

  it('should set new notification props', () => {
    const props = mockProps()
    const sut = makeSut(props)

    const newProps = mockProps()
    sut.recipientId = newProps.recipientId
    sut.content = newProps.content
    sut.category = newProps.category
    sut.readAt = newProps.readAt

    expect(sut.recipientId).toStrictEqual(newProps.recipientId)
    expect(sut.content).toStrictEqual(newProps.content)
    expect(sut.category).toStrictEqual(newProps.category)
    expect(sut.readAt).toStrictEqual(newProps.readAt)
  })
})
