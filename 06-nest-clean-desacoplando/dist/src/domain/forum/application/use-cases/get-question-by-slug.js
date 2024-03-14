"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetQuestionBySlugUseCase = void 0;
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
class GetQuestionBySlugUseCase {
    questionsRepository;
    constructor(questionsRepository) {
        this.questionsRepository = questionsRepository;
    }
    async execute({ slug, }) {
        const question = await this.questionsRepository.findBySlug(slug);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.right)({
            question,
        });
    }
}
exports.GetQuestionBySlugUseCase = GetQuestionBySlugUseCase;
//# sourceMappingURL=get-question-by-slug.js.map