import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
export declare class PrismaQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
    deleteManyByQuestionId(questionId: string): Promise<void>;
}
