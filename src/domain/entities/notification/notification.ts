import { randomUUID } from 'node:crypto'
import { NotificationContent } from './notification-content'

export class Notification {
  private readonly props: Notification.Props

  constructor(props: Notification.Params) {
    this.props = {
      id: props.id ?? randomUUID(),
      category: props.category,
      content: new NotificationContent(props.content),
      recipientId: props.recipientId,
      readAt: props.readAt ?? null,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get id() {
    return this.props.id
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set content(content: string) {
    this.props.content = new NotificationContent(content)
  }

  public get content(): string {
    return this.props.content.value
  }

  public set category(category: string) {
    this.props.category = category
  }

  public get category(): string {
    return this.props.category
  }

  public set readAt(readAt: Date | null) {
    this.props.readAt = readAt
  }

  public get readAt(): Date | null {
    return this.props.readAt
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

export namespace Notification {
  export interface Props {
    id: string
    recipientId: string
    content: NotificationContent
    category: string
    readAt: Date | null
    createdAt: Date
  }

  export interface Params {
    id?: string
    recipientId: string
    content: string
    category: string
    readAt?: Date | null
    createdAt?: Date
  }
}
