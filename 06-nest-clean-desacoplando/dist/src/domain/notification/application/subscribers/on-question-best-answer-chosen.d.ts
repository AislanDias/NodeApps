import { EventHandler } from '@/core/events/event-handler';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';
export declare class OnQuestionBestAnswerChosen implements EventHandler {
    private answersRepository;
    private sendNotification;
    constructor(answersRepository: AnswersRepository, sendNotification: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendQuestionBestAnswerNotification;
}
