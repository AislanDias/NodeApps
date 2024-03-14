"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAnswerUseCase = void 0;
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
const answer_attachment_list_1 = require("../../enterprise/entities/answer-attachment-list");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_attachment_1 = require("../../enterprise/entities/answer-attachment");
class EditAnswerUseCase {
    answersRepository;
    answerAttachmentsRepository;
    constructor(answersRepository, answerAttachmentsRepository) {
        this.answersRepository = answersRepository;
        this.answerAttachmentsRepository = answerAttachmentsRepository;
    }
    async execute({ authorId, answerId, content, attachmentsIds, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== answer.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId);
        const answerAttachmentList = new answer_attachment_list_1.AnswerAttachmentList(currentAnswerAttachments);
        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return answer_attachment_1.AnswerAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                answerId: answer.id,
            });
        });
        answerAttachmentList.update(answerAttachments);
        answer.attachments = answerAttachmentList;
        answer.content = content;
        await this.answersRepository.save(answer);
        return (0, either_1.right)({
            answer,
        });
    }
}
exports.EditAnswerUseCase = EditAnswerUseCase;
//# sourceMappingURL=edit-answer.js.map