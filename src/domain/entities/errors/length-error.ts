import { Param } from '@/domain/entities'

export class LengthError extends Error {
  constructor(props: LengthError.Props) {
    const isHigher = props.max ? props.length > props.max : false
    const adjective = isHigher ? 'lower' : 'higher'
    const desired = isHigher ? props.max : props.min
    const capitalizedValue = new Param(props.param).capitalizedValue
    const msg = `${capitalizedValue} must be ${adjective} than ${desired}`
    super(msg)
    this.name = 'LengthError'
  }
}

export namespace LengthError {
  export interface Props {
    param: string
    length: number
    min: number
    max?: number
  }
}
