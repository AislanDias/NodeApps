"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseQuestionBestAnswerUseCase = void 0;
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const not_allowed_error_1 = require("../../../../core/errors/errors/not-allowed-error");
class ChooseQuestionBestAnswerUseCase {
    questionsRepository;
    answersRepository;
    constructor(questionsRepository, answersRepository) {
        this.questionsRepository = questionsRepository;
        this.answersRepository = answersRepository;
    }
    async execute({ answerId, authorId, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const question = await this.questionsRepository.findById(answer.questionId.toString());
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (authorId !== question.authorId.toString()) {
            return (0, either_1.left)(new not_allowed_error_1.NotAllowedError());
        }
        question.bestAnswerId = answer.id;
        await this.questionsRepository.save(question);
        return (0, either_1.right)({
            question,
        });
    }
}
exports.ChooseQuestionBestAnswerUseCase = ChooseQuestionBestAnswerUseCase;
//# sourceMappingURL=choose-question-best-answer.js.map