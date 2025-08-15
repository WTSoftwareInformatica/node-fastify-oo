"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCase = void 0;
class GetUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return await this.repo.findById(id);
    }
}
exports.GetUserUseCase = GetUserUseCase;
