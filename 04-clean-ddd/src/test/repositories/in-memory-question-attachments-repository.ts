import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachment'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }
}
