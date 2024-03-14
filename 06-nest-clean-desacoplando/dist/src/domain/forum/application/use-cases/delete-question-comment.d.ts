import { Either } from '@/core/either';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}
type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;
export declare class DeleteQuestionCommentUseCase {
    private questionCommentsRepository;
    constructor(questionCommentsRepository: QuestionCommentsRepository);
    execute({ authorId, questionCommentId, }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse>;
}
export {};
