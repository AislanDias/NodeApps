import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const createQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type EditAnswerBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions/:questionId/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) { }

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
