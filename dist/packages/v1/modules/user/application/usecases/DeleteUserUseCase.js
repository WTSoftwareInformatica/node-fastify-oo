"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
class DeleteUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        await this.repo.delete(id);
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
