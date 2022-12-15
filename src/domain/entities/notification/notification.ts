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
      canceledAt: props.canceledAt ?? null,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get id() {
    return this.props.id
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public get content(): string {
    return this.props.content.value
  }

  public get category(): string {
    return this.props.category
  }

  public read(): void {
    this.props.readAt = new Date()
  }

  public unread(): void {
    this.props.readAt = null
  }

  public get readAt(): Date | null {
    return this.props.readAt
  }

  public cancel(): void {
    this.props.canceledAt = new Date()
  }

  public get canceledAt(): Date | null {
    return this.props.canceledAt
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
    canceledAt: Date | null
    createdAt: Date
  }

  export interface Params {
    id?: string
    recipientId: string
    content: string
    category: string
    readAt?: Date | null
    canceledAt?: Date | null
    createdAt?: Date
  }
}
