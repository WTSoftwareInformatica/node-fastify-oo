"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFastifyController = void 0;
class UserFastifyController {
    constructor(createUser, getUser, updateUser, deleteUser, listUsers) {
        this.createUser = createUser;
        this.getUser = getUser;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.listUsers = listUsers;
    }
    async create(req) {
        const user = await this.createUser.execute(req.body);
        return { statusCode: 201, body: user };
    }
    async getById(req) {
        const user = await this.getUser.execute(req.params.id);
        return { statusCode: 200, body: user };
    }
    async update(req) {
        const user = await this.updateUser.execute(req.params.id, req.body);
        return { statusCode: 200, body: user };
    }
    async delete(req) {
        await this.deleteUser.execute(req.params.id);
        return { statusCode: 204, body: null };
    }
    async list(_) {
        const users = await this.listUsers.execute();
        return { statusCode: 200, body: users };
    }
}
exports.UserFastifyController = UserFastifyController;
