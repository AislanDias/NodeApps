import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { Either } from '@/core/either';
interface FetchAnswerCommentsUseCaseRequest {
    answerId: string;
    page: number;
}
type FetchAnswerCommentsUseCaseResponse = Either<null, {
    answerComments: AnswerComment[];
}>;
export declare class FetchAnswerCommentsUseCase {
    private answerCommentsRepository;
    constructor(answerCommentsRepository: AnswerCommentsRepository);
    execute({ answerId, page, }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse>;
}
export {};
