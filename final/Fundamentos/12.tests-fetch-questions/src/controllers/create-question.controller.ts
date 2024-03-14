import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PrismaService } from '@/prisma/prisma.service'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

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
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })

    return 'ok'
  }

  // Watch the video to implement it: 19. Controller de listagem de perguntas
  private convertToSlug(source: string): string {
    return source
  }
}
