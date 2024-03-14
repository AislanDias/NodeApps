"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchQuestionCommentsUseCase = void 0;
const either_1 = require("../../../../core/either");
class FetchQuestionCommentsUseCase {
    questionCommentsRepository;
    constructor(questionCommentsRepository) {
        this.questionCommentsRepository = questionCommentsRepository;
    }
    async execute({ questionId, page, }) {
        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, {
            page,
        });
        return (0, either_1.right)({
            questionComments,
        });
    }
}
exports.FetchQuestionCommentsUseCase = FetchQuestionCommentsUseCase;
//# sourceMappingURL=fetch-question-comments.js.map