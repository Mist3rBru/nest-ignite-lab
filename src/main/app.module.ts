import { DatabaseModule, HttpModule } from '@/main/modules'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule, DatabaseModule]
})
export class AppModule {}
