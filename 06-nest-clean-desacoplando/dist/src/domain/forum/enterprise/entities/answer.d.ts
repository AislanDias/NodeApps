import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list';
export interface AnswerProps {
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    content: string;
    attachments: AnswerAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Answer extends AggregateRoot<AnswerProps> {
    get authorId(): UniqueEntityID;
    get questionId(): UniqueEntityID;
    get content(): string;
    set content(content: string);
    get attachments(): AnswerAttachmentList;
    set attachments(attachments: AnswerAttachmentList);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    get excerpt(): string;
    private touch;
    static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID): Answer;
}
