import { Param } from '@/domain/entities'

export class NotFoundError extends Error {
  constructor(param: string) {
    const capitalizedValue = new Param(param).capitalizedValue
    const msg = `${capitalizedValue} not found`
    super(msg)
    this.name = 'NotFoundError'
  }
}
