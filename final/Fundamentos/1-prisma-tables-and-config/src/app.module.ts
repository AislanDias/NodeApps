import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// All controller dependencies must be inside providers
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
