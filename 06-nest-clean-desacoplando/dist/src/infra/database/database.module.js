"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_questions_repository_1 = require("./prisma/repositories/prisma-questions-repository");
const prisma_question_comments_repository_1 = require("./prisma/repositories/prisma-question-comments-repository");
const prisma_question_attachment_repository_1 = require("./prisma/repositories/prisma-question-attachment-repository");
const prisma_answer_attachments_repository_1 = require("./prisma/repositories/prisma-answer-attachments-repository");
const prisma_answer_comments_repository_1 = require("./prisma/repositories/prisma-answer-comments-repository");
const prisma_answers_repository_1 = require("./prisma/repositories/prisma-answers-repository");
const questions_repository_1 = require("../../domain/forum/application/repositories/questions-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: questions_repository_1.QuestionsRepository,
                useClass: prisma_questions_repository_1.PrismaQuestionsRepository,
            },
            prisma_questions_repository_1.PrismaQuestionsRepository,
            prisma_question_comments_repository_1.PrismaQuestionCommentsRepository,
            prisma_question_attachment_repository_1.PrismaQuestionAttachmentsRepository,
            prisma_answers_repository_1.PrismaAnswersRepository,
            prisma_answer_comments_repository_1.PrismaAnswerCommentsRepository,
            prisma_answer_attachments_repository_1.PrismaAnswerAttachmentsRepository,
        ],
        exports: [
            prisma_service_1.PrismaService,
            questions_repository_1.QuestionsRepository,
            prisma_question_comments_repository_1.PrismaQuestionCommentsRepository,
            prisma_question_attachment_repository_1.PrismaQuestionAttachmentsRepository,
            prisma_answers_repository_1.PrismaAnswersRepository,
            prisma_answer_comments_repository_1.PrismaAnswerCommentsRepository,
            prisma_answer_attachments_repository_1.PrismaAnswerAttachmentsRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map