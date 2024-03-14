import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from 'src/auth/jwt.strategy';
import { z } from 'zod';
declare const createQuestionBodySchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
export declare class CreateQuestionController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateQuestionBodySchema, user: UserPayload): Promise<string>;
    private convertToSlug;
}
export {};
