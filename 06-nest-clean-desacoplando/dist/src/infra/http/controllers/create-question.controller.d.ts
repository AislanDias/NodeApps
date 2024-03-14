import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
declare const createQuestionBodySchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
}, {
    content: string;
    title: string;
}>;
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
export declare class CreateQuestionController {
    private createQuestion;
    constructor(createQuestion: CreateQuestionUseCase);
    handle(body: CreateQuestionBodySchema, user: UserPayload): Promise<void>;
}
export {};
