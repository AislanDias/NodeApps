"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAnswerCommentUseCase = void 0;
const either_1 = require("../../../../core/either");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
class DeleteAnswerCommentUseCase {
    answerCommentsRepository;
    constructor(answerCommentsRepository) {
        this.answerCommentsRepository = answerCommentsRepository;
    }
    async execute({ authorId, answerCommentId, }) {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);
        if (!answerComment) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (answerComment.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.answerCommentsRepository.delete(answerComment);
        return (0, either_1.right)(null);
    }
}
exports.DeleteAnswerCommentUseCase = DeleteAnswerCommentUseCase;
//# sourceMappingURL=delete-answer-comment.js.map