import { Either } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;
export declare class DeleteAnswerUseCase {
    private answersRepository;
    constructor(answersRepository: AnswersRepository);
    execute({ answerId, authorId, }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse>;
}
export {};
