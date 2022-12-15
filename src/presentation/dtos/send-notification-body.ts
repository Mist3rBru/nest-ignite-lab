import { IsNotEmpty, Length } from 'class-validator'

export class SendNotificationBody {
  @IsNotEmpty()
  recipientId: string

  @IsNotEmpty()
  @Length(5, 240)
  content: string

  @IsNotEmpty()
  category: string
}