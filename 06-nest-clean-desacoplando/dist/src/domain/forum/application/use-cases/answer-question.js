"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerQuestionUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_1 = require("../../enterprise/entities/answer");
const either_1 = require("../../../../core/either");
const answer_attachment_1 = require("../../enterprise/entities/answer-attachment");
const answer_attachment_list_1 = require("../../enterprise/entities/answer-attachment-list");
class AnswerQuestionUseCase {
    answersRepository;
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async execute({ instructorId, questionId, content, attachmentsIds, }) {
        const answer = answer_1.Answer.create({
            content,
            authorId: new unique_entity_id_1.UniqueEntityID(instructorId),
            questionId: new unique_entity_id_1.UniqueEntityID(questionId),
        });
        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return answer_attachment_1.AnswerAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                answerId: answer.id,
            });
        });
        answer.attachments = new answer_attachment_list_1.AnswerAttachmentList(answerAttachments);
        await this.answersRepository.create(answer);
        return (0, either_1.right)({
            answer,
        });
    }
}
exports.AnswerQuestionUseCase = AnswerQuestionUseCase;
//# sourceMappingURL=answer-question.js.map