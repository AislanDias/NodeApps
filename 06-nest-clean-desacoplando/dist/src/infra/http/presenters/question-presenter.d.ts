import { Question } from '@/domain/forum/enterprise/entities/question';
export declare class QuestionPresenter {
    static toHTTP(question: Question): {
        id: string;
        title: string;
        slug: string;
        bestAnswerId: (() => string) | undefined;
        createdAt: Date;
        updatedAt: Date | null | undefined;
    };
}
