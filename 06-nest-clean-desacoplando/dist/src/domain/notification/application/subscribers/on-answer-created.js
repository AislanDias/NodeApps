"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAnswerCreated = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const answer_created_event_1 = require("../../../forum/enterprise/events/answer-created-event");
class OnAnswerCreated {
    questionsRepository;
    sendNotification;
    constructor(questionsRepository, sendNotification) {
        this.questionsRepository = questionsRepository;
        this.sendNotification = sendNotification;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNewAnswerNotification.bind(this), answer_created_event_1.AnswerCreatedEvent.name);
    }
    async sendNewAnswerNotification({ answer }) {
        const question = await this.questionsRepository.findById(answer.questionId.toString());
        if (question) {
            await this.sendNotification.execute({
                recipientId: question.authorId.toString(),
                title: `Nova resposta em "${question.title
                    .substring(0, 40)
                    .concat('...')}"`,
                content: answer.excerpt,
            });
        }
    }
}
exports.OnAnswerCreated = OnAnswerCreated;
//# sourceMappingURL=on-answer-created.js.map