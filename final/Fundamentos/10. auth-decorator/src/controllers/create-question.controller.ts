import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  // @Post()
  // async handle(@Req() request: Request) {
  //   console.log(request.user)

  //   return 'ok'
  // }

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)

    return 'ok'
  }
}
