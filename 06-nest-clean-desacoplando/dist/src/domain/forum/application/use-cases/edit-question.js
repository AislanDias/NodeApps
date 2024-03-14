"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditQuestionUseCase = void 0;
const either_1 = require("../../../../core/either");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const question_attachment_list_1 = require("../../enterprise/entities/question-attachment-list");
const question_attachment_1 = require("../../enterprise/entities/question-attachment");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class EditQuestionUseCase {
    questionsRepository;
    questionAttachmentsRepository;
    constructor(questionsRepository, questionAttachmentsRepository) {
        this.questionsRepository = questionsRepository;
        this.questionAttachmentsRepository = questionAttachmentsRepository;
    }
    async execute({ authorId, questionId, title, content, attachmentsIds, }) {
        const question = await this.questionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== question.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId);
        const questionAttachmentList = new question_attachment_list_1.QuestionAttachmentList(currentQuestionAttachments);
        const questionAttachments = attachmentsIds.map((attachmentId) => {
            return question_attachment_1.QuestionAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentId),
                questionId: question.id,
            });
        });
        questionAttachmentList.update(questionAttachments);
        question.attachments = questionAttachmentList;
        question.title = title;
        question.content = content;
        await this.questionsRepository.save(question);
        return (0, either_1.right)({
            question,
        });
    }
}
exports.EditQuestionUseCase = EditQuestionUseCase;
//# sourceMappingURL=edit-question.js.map