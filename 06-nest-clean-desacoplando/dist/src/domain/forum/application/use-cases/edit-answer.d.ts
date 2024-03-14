import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
interface EditAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
    attachmentsIds: string[];
}
type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer: Answer;
}>;
export declare class EditAnswerUseCase {
    private answersRepository;
    private answerAttachmentsRepository;
    constructor(answersRepository: AnswersRepository, answerAttachmentsRepository: AnswerAttachmentsRepository);
    execute({ authorId, answerId, content, attachmentsIds, }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>;
}
export {};
