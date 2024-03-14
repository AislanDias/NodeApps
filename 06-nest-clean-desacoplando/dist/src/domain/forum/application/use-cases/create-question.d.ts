import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either } from '@/core/either';
interface CreateQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}
type CreateQuestionUseCaseResponse = Either<null, {
    question: Question;
}>;
export declare class CreateQuestionUseCase {
    private questionsRepository;
    constructor(questionsRepository: QuestionsRepository);
    execute({ authorId, title, content, attachmentsIds, }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse>;
}
export {};
