"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
const slug_1 = require("./value-objects/slug");
const dayjs_1 = require("dayjs");
const question_attachment_list_1 = require("./question-attachment-list");
const question_best_answer_chosen_event_1 = require("../events/question-best-answer-chosen-event");
class Question extends aggregate_root_1.AggregateRoot {
    get authorId() {
        return this.props.authorId;
    }
    get bestAnswerId() {
        return this.props.bestAnswerId;
    }
    set bestAnswerId(bestAnswerId) {
        if (bestAnswerId === undefined) {
            return;
        }
        if (this.props.bestAnswerId === undefined ||
            bestAnswerId !== this.props.bestAnswerId) {
            this.addDomainEvent(new question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent(this, bestAnswerId));
        }
        this.props.bestAnswerId = bestAnswerId;
        this.touch();
    }
    get title() {
        return this.props.title;
    }
    set title(title) {
        this.props.title = title;
        this.props.slug = slug_1.Slug.createFromText(title);
        this.touch();
    }
    get content() {
        return this.props.content;
    }
    set content(content) {
        this.props.content = content;
        this.touch();
    }
    get slug() {
        return this.props.slug;
    }
    get attachments() {
        return this.props.attachments;
    }
    set attachments(attachments) {
        this.props.attachments = attachments;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get isNew() {
        return (0, dayjs_1.default)().diff(this.createdAt, 'days') <= 3;
    }
    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...');
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const question = new Question({
            ...props,
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
            attachments: props.attachments ?? new question_attachment_list_1.QuestionAttachmentList(),
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return question;
    }
}
exports.Question = Question;
//# sourceMappingURL=question.js.map