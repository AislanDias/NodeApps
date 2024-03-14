"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
const answer_attachment_list_1 = require("./answer-attachment-list");
const answer_created_event_1 = require("../events/answer-created-event");
class Answer extends aggregate_root_1.AggregateRoot {
    get authorId() {
        return this.props.authorId;
    }
    get questionId() {
        return this.props.questionId;
    }
    get content() {
        return this.props.content;
    }
    set content(content) {
        this.props.content = content;
        this.touch();
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
    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...');
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const answer = new Answer({
            ...props,
            attachments: props.attachments ?? new answer_attachment_list_1.AnswerAttachmentList(),
            createdAt: props.createdAt ?? new Date(),
        }, id);
        const isNewAnswer = !id;
        if (isNewAnswer) {
            answer.addDomainEvent(new answer_created_event_1.AnswerCreatedEvent(answer));
        }
        return answer;
    }
}
exports.Answer = Answer;
//# sourceMappingURL=answer.js.map