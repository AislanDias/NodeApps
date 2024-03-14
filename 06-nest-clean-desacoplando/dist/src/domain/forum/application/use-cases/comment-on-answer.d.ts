import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
interface CommentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}
type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment;
}>;
export declare class CommentOnAnswerUseCase {
    private answersRepository;
    private answerCommentsRepository;
    constructor(answersRepository: AnswersRepository, answerCommentsRepository: AnswerCommentsRepository);
    execute({ authorId, answerId, content, }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>;
}
export {};
