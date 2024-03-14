"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAnswerCommentsUseCase = void 0;
const either_1 = require("../../../../core/either");
class FetchAnswerCommentsUseCase {
    answerCommentsRepository;
    constructor(answerCommentsRepository) {
        this.answerCommentsRepository = answerCommentsRepository;
    }
    async execute({ answerId, page, }) {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
            page,
        });
        return (0, either_1.right)({
            answerComments,
        });
    }
}
exports.FetchAnswerCommentsUseCase = FetchAnswerCommentsUseCase;
//# sourceMappingURL=fetch-answer-comments.js.map