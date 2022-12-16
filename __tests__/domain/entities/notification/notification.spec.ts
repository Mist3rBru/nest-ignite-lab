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
  readAt: null,
  canceledAt: null
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

  it('should soft cancel notification', () => {
    const props = mockProps()

    props.canceledAt = null
    const sut = makeSut(props)
    sut.cancel()

    expect(sut.canceledAt).toStrictEqual(expect.any(Date))
  })

  it('should mark notification with first canceled date', () => {
    const props = mockProps()

    props.canceledAt = faker.date.past()
    const sut = makeSut(props)
    sut.cancel()

    expect(sut.canceledAt).toStrictEqual(props.canceledAt)
  })

  it('should mark notification as read', () => {
    const props = mockProps()

    props.readAt = null
    const sut = makeSut(props)
    sut.read()

    expect(sut.readAt).toStrictEqual(expect.any(Date))
  })

  it('should mark notification with first read date', () => {
    const props = mockProps()

    props.readAt = faker.date.past()
    const sut = makeSut(props)
    sut.read()

    expect(sut.readAt).toStrictEqual(props.readAt)
  })

  it('should mark notification as unread', () => {
    const props = mockProps()

    props.readAt = new Date()
    const sut = makeSut(props)
    sut.unread()

    expect(sut.readAt).toBeNull()
  })

  it('should return true if notification is neither read or canceled', () => {
    const props = mockProps()

    props.canceledAt = null
    props.readAt = null
    const notification = makeSut(props)

    expect(notification.isNew).toBe(true)
  })

  it('should return false if notification was read', () => {
    const props = mockProps()

    props.canceledAt = null
    props.readAt = new Date()
    const notification = makeSut(props)

    expect(notification.isNew).toBe(false)
  })

  it('should return false if notification was canceled', () => {
    const props = mockProps()

    props.canceledAt = new Date()
    props.readAt = null
    const notification = makeSut(props)

    expect(notification.isNew).toBe(false)
  })
})
