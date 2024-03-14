import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either } from '@/core/either';
interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}
type FetchRecentQuestionsUseCaseResponse = Either<null, {
    questions: Question[];
}>;
export declare class FetchRecentQuestionsUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ page, }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse>;
}
export {};
