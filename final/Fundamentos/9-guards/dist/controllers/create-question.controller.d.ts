import { PrismaService } from 'src/prisma/prisma.service';
export declare class CreateQuestionController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(): Promise<string>;
}
