"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersUseCase = void 0;
class ListUsersUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return await this.repo.list();
    }
}
exports.ListUsersUseCase = ListUsersUseCase;
