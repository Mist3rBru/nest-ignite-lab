import { DatabaseModule, HttpModule, MessagingModule } from '@/main/modules'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule]
})
export class AppModule {}
