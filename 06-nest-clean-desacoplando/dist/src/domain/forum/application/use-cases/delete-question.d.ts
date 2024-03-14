import { Either } from '@/core/either';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}
type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;
export declare class DeleteQuestionUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ questionId, authorId, }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse>;
}
export {};
