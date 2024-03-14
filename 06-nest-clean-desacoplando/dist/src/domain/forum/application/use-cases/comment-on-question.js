"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOnQuestionUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const question_comment_1 = require("../../enterprise/entities/question-comment");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
class CommentOnQuestionUseCase {
    questionsRepository;
    questionCommentsRepository;
    constructor(questionsRepository, questionCommentsRepository) {
        this.questionsRepository = questionsRepository;
        this.questionCommentsRepository = questionCommentsRepository;
    }
    async execute({ authorId, questionId, content, }) {
        const question = await this.questionsRepository.findById(questionId);
        if (!question) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const questionComment = question_comment_1.QuestionComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            questionId: new unique_entity_id_1.UniqueEntityID(questionId),
            content,
        });
        await this.questionCommentsRepository.create(questionComment);
        return (0, either_1.right)({
            questionComment,
        });
    }
}
exports.CommentOnQuestionUseCase = CommentOnQuestionUseCase;
//# sourceMappingURL=comment-on-question.js.map