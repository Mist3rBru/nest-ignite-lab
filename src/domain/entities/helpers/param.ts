export class Param {
  private readonly props: {
    value: string
  }

  constructor(value: string) {
    this.props = { value }
  }

  private capitalize(text: string): string {
    const [first, ...rest] = text

    return [first.toUpperCase(), ...rest].join('')
  }

  get value(): string {
    return this.props.value
  }

  get capitalizedValue(): string {
    return this.capitalize(this.value)
  }
}
