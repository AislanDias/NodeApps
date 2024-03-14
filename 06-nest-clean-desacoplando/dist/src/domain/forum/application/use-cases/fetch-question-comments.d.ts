import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { Either } from '@/core/either';
interface FetchQuestionCommentsUseCaseRequest {
    questionId: string;
    page: number;
}
type FetchQuestionCommentsUseCaseResponse = Either<null, {
    questionComments: QuestionComment[];
}>;
export declare class FetchQuestionCommentsUseCase {
    private questionCommentsRepository;
    constructor(questionCommentsRepository: QuestionCommentsRepository);
    execute({ questionId, page, }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse>;
}
export {};
