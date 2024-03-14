import { Either } from '@/core/either';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
interface DeleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}
type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;
export declare class DeleteAnswerCommentUseCase {
    private answerCommentsRepository;
    constructor(answerCommentsRepository: AnswerCommentsRepository);
    execute({ authorId, answerCommentId, }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse>;
}
export {};
