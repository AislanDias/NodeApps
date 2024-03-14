import { Either } from '@/core/either';
import { AnswersRepository } from '../repositories//answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
interface FetchQuestionAnswersUseCaseRequest {
    questionId: string;
    page: number;
}
type FetchQuestionAnswersUseCaseResponse = Either<null, {
    answers: Answer[];
}>;
export declare class FetchQuestionAnswersUseCase {
    private answersRepository;
    constructor(answersRepository: AnswersRepository);
    execute({ questionId, page, }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse>;
}
export {};
