"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionUseCase = void 0;
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
class DeleteQuestionUseCase {
    questionsRepository;
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ questionId, authorId, }) {
        const question = await this.questionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== question.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.questionsRepository.delete(question);
        return (0, either_1.right)(null);
    }
}
exports.DeleteQuestionUseCase = DeleteQuestionUseCase;
//# sourceMappingURL=delete-question.js.map