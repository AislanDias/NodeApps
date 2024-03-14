import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
interface AttachmentProps {
    title: string;
    link: string;
}
export declare class Attachment extends Entity<AttachmentProps> {
    get title(): string;
    get link(): string;
    static create(props: AttachmentProps, id?: UniqueEntityID): Attachment;
}
export {};
