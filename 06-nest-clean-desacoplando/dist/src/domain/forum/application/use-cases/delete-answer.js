"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAnswerUseCase = void 0;
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
class DeleteAnswerUseCase {
    answersRepository;
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async execute({ answerId, authorId, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== answer.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        await this.answersRepository.delete(answer);
        return (0, either_1.right)(null);
    }
}
exports.DeleteAnswerUseCase = DeleteAnswerUseCase;
//# sourceMappingURL=delete-answer.js.map