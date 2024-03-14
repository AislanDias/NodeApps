"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestionCommentUseCase = void 0;
const either_1 = require("../../../../core/either");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
class DeleteQuestionCommentUseCase {
    questionCommentsRepository;
    constructor(questionCommentsRepository) {
        this.questionCommentsRepository = questionCommentsRepository;
    }
    async execute({ authorId, questionCommentId, }) {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);
        if (!questionComment) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (questionComment.authorId.toString() !== authorId) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.questionCommentsRepository.delete(questionComment);
        return (0, either_1.right)(null);
    }
}
exports.DeleteQuestionCommentUseCase = DeleteQuestionCommentUseCase;
//# sourceMappingURL=delete-question-comment.js.map