import { LengthError } from '../errors/length-error'

export class NotificationContent {
  private readonly content: string

  constructor(content: string) {
    const length = content.length
    if (length < 5 || length > 240) {
      throw new LengthError({
        length,
        min: 5,
        max: 240,
        param: 'content'
      })
    }

    this.content = content
  }

  get value(): string {
    return this.content
  }
}
