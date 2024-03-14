"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnQuestionBestAnswerChosen = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const question_best_answer_chosen_event_1 = require("../../../forum/enterprise/events/question-best-answer-chosen-event");
class OnQuestionBestAnswerChosen {
    answersRepository;
    sendNotification;
    constructor(answersRepository, sendNotification) {
        this.answersRepository = answersRepository;
        this.sendNotification = sendNotification;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent.name);
    }
    async sendQuestionBestAnswerNotification({ question, bestAnswerId, }) {
        const answer = await this.answersRepository.findById(bestAnswerId.toString());
        if (answer) {
            await this.sendNotification.execute({
                recipientId: answer.authorId.toString(),
                title: `Sua resposta foi escolhida!`,
                content: `A resposta que você enviou em "${question.title
                    .substring(0, 20)
                    .concat('...')}" foi escolhida pelo autor!"`,
            });
        }
    }
}
exports.OnQuestionBestAnswerChosen = OnQuestionBestAnswerChosen;
//# sourceMappingURL=on-question-best-answer-chosen.js.map