import { Either } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}
type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}>;
export declare class EditQuestionUseCase {
    private questionsRepository;
    private questionAttachmentsRepository;
    constructor(questionsRepository: QuestionsRepository, questionAttachmentsRepository: QuestionAttachmentsRepository);
    execute({ authorId, questionId, title, content, attachmentsIds, }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>;
}
export {};
