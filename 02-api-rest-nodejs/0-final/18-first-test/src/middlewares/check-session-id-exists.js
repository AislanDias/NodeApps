"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionIdExists = void 0;
async function checkSessionIdExists(request, reply) {
    const sessionId = request.cookies.sessionId;
    if (!sessionId) {
        return reply.status(401).send({
            error: 'Unauthorized.',
        });
    }
}
exports.checkSessionIdExists = checkSessionIdExists;
