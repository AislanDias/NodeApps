import { EventHandler } from '@/core/events/event-handler';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';
export declare class OnAnswerCreated implements EventHandler {
    private questionsRepository;
    private sendNotification;
    constructor(questionsRepository: QuestionsRepository, sendNotification: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNewAnswerNotification;
}
