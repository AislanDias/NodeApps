"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOnAnswerUseCase = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const answer_comment_1 = require("../../enterprise/entities/answer-comment");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
class CommentOnAnswerUseCase {
    answersRepository;
    answerCommentsRepository;
    constructor(answersRepository, answerCommentsRepository) {
        this.answersRepository = answersRepository;
        this.answerCommentsRepository = answerCommentsRepository;
    }
    async execute({ authorId, answerId, content, }) {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const answerComment = answer_comment_1.AnswerComment.create({
            authorId: new unique_entity_id_1.UniqueEntityID(authorId),
            answerId: new unique_entity_id_1.UniqueEntityID(answerId),
            content,
        });
        await this.answerCommentsRepository.create(answerComment);
        return (0, either_1.right)({
            answerComment,
        });
    }
}
exports.CommentOnAnswerUseCase = CommentOnAnswerUseCase;
//# sourceMappingURL=comment-on-answer.js.map