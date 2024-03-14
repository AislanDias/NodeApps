import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}
type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
    question: Question;
}>;
export declare class GetQuestionBySlugUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ slug, }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse>;
}
export {};
