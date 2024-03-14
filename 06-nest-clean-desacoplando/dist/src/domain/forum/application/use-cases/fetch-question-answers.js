"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchQuestionAnswersUseCase = void 0;
const either_1 = require("../../../../core/either");
class FetchQuestionAnswersUseCase {
    answersRepository;
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async execute({ questionId, page, }) {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });
        return (0, either_1.right)({
            answers,
        });
    }
}
exports.FetchQuestionAnswersUseCase = FetchQuestionAnswersUseCase;
//# sourceMappingURL=fetch-question-answers.js.map