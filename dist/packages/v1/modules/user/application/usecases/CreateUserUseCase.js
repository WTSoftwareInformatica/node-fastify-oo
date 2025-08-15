"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(data) {
        return await this.repo.create(data);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
