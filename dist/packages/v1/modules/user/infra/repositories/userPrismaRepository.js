"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserPrismaRepository {
    async create(data) {
        return await prisma.user.create({ data });
    }
    async findById(id) {
        return await prisma.user.findUnique({ where: { id } });
    }
    async update(id, data) {
        return await prisma.user.update({ where: { id }, data });
    }
    async delete(id) {
        await prisma.user.delete({ where: { id } });
    }
    async list() {
        return await prisma.user.findMany();
    }
}
exports.UserPrismaRepository = UserPrismaRepository;
