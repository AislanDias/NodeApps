import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either } from '@/core/either';
interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    attachmentsIds: string[];
    content: string;
}
type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer;
}>;
export declare class AnswerQuestionUseCase {
    private answersRepository;
    constructor(answersRepository: AnswersRepository);
    execute({ instructorId, questionId, content, attachmentsIds, }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse>;
}
export {};
