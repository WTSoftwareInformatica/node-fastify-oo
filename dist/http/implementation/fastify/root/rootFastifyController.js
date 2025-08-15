"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
class RootController {
    async handle(_) {
        return {
            statusCode: 200,
            body: { message: 'Alô mundo' },
        };
    }
}
exports.RootController = RootController;
