"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchRecentQuestionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const zod_1 = require("zod");
const fetch_recent_questions_1 = require("../../../domain/forum/application/use-cases/fetch-recent-questions");
const question_presenter_1 = require("../presenters/question-presenter");
const pageQueryParamSchema = zod_1.z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(zod_1.z.number().min(1));
const queryValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(pageQueryParamSchema);
let FetchRecentQuestionsController = class FetchRecentQuestionsController {
    fetchRecentQuestions;
    constructor(fetchRecentQuestions) {
        this.fetchRecentQuestions = fetchRecentQuestions;
    }
    async handle(page) {
        const result = await this.fetchRecentQuestions.execute({
            page,
        });
        if (result.isLeft()) {
            throw new Error();
        }
        const questions = result.value.questions;
        return { questions: questions.map(question_presenter_1.QuestionPresenter.toHTTP) };
    }
};
exports.FetchRecentQuestionsController = FetchRecentQuestionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', queryValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FetchRecentQuestionsController.prototype, "handle", null);
exports.FetchRecentQuestionsController = FetchRecentQuestionsController = __decorate([
    (0, common_1.Controller)('/questions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [fetch_recent_questions_1.FetchRecentQuestionsUseCase])
], FetchRecentQuestionsController);
//# sourceMappingURL=fetch-recent-questions.controller.js.map