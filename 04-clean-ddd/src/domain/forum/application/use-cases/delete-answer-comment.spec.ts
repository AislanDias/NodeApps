import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase
// sut = System Under Test

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answer = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answer)

    await sut.execute({
      answerCommentId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user answer comment', async () => {
    const answer = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerCommentId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
