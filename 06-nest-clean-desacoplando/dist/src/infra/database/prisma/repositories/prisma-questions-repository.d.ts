import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaService } from '../prisma.service';
export declare class PrismaQuestionsRepository implements QuestionsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Question | null>;
    findBySlug(slug: string): Promise<Question | null>;
    findManyRecent({ page }: PaginationParams): Promise<Question[]>;
    create(question: Question): Promise<void>;
    save(question: Question): Promise<void>;
    delete(question: Question): Promise<void>;
}
