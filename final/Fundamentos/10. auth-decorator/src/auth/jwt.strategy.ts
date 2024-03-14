import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

// EVERY CLASS THAT IS A PROVIDER NEEDS TO HAVE THE INJECTABLE
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    // fromAuthHeaderAsBearerToken is where we are getting the token
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RSA256'],
    })
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
