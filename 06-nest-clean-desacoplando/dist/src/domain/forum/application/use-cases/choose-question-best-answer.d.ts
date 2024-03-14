import { AnswersRepository } from '../repositories/answers-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}>;
export declare class ChooseQuestionBestAnswerUseCase {
    private questionsRepository;
    private answersRepository;
    constructor(questionsRepository: QuestionsRepository, answersRepository: AnswersRepository);
    execute({ answerId, authorId, }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse>;
}
export {};
