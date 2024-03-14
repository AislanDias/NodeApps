import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from 'src/auth/jwt.strategy';
export declare class CreateQuestionController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(user: UserPayload): Promise<string>;
}
