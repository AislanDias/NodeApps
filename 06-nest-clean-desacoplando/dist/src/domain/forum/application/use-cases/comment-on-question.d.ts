import { QuestionsRepository } from '../repositories/questions-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
interface CommentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}
type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment;
}>;
export declare class CommentOnQuestionUseCase {
    private questionsRepository;
    private questionCommentsRepository;
    constructor(questionsRepository: QuestionsRepository, questionCommentsRepository: QuestionCommentsRepository);
    execute({ authorId, questionId, content, }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse>;
}
export {};
