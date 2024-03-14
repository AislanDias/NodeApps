import { AggregateRoot } from '@/core/entities/aggregate-root';
import { Slug } from './value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { QuestionAttachmentList } from './question-attachment-list';
export interface QuestionProps {
    authorId: UniqueEntityID;
    bestAnswerId?: UniqueEntityID | null;
    title: string;
    content: string;
    slug: Slug;
    attachments: QuestionAttachmentList;
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class Question extends AggregateRoot<QuestionProps> {
    get authorId(): UniqueEntityID;
    get bestAnswerId(): UniqueEntityID | undefined | null;
    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null);
    get title(): string;
    set title(title: string);
    get content(): string;
    set content(content: string);
    get slug(): Slug;
    get attachments(): QuestionAttachmentList;
    set attachments(attachments: QuestionAttachmentList);
    get createdAt(): Date;
    get updatedAt(): Date | null | undefined;
    get isNew(): boolean;
    get excerpt(): string;
    private touch;
    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityID): Question;
}
