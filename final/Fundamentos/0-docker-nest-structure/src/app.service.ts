import { Injectable } from '@nestjs/common'

// Injectable is a way to say that this service will be used as a dependecy in another controllers
// Everything that we don't receive as a http request is a provider
// Controllers is what receives http requests and the others are providers
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
