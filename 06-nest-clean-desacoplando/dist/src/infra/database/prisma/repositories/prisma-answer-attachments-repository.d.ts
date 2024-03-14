import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
export declare class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
    deleteManyByAnswerId(answerId: string): Promise<void>;
}
