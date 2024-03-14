import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  // ConfigService catches a dependency from our application
  // const configService: ConfigService<Env> = app.get(ConfigService)
  // const configService = app.get(ConfigService) as ConfigService<Env> LEAST DESIRED
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  // By default for NEST all environment variables can be undefined
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
