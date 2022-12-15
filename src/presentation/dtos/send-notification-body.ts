import { IsNotEmpty, IsUUID, Length } from 'class-validator'

export class SendNotificationBody {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string

  @IsNotEmpty()
  @Length(5, 240)
  content: string

  @IsNotEmpty()
  category: string
}
