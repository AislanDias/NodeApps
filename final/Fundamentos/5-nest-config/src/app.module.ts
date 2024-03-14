import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

// All controller dependencies must be inside providers
// If i need to pass configuration we need to use .forRoot()
// envSchema.parse will throw an error if it is invalid
// isGlobal is used to make this module accessible anywhere, so we don't need to config it for each module
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
