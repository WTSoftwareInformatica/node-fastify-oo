"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
class UpdateUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data) {
        return await this.repo.update(id, data);
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
