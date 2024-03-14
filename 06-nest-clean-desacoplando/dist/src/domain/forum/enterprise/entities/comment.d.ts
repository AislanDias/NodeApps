import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface CommentProps {
    authorId: UniqueEntityID;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare abstract class Comment<Props extends CommentProps> extends Entity<Props> {
    get authorId(): UniqueEntityID;
    get content(): string;
    set content(content: string);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
}
