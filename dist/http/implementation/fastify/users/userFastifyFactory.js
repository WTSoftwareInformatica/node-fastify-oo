"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFastifyFactory = void 0;
const userFastifyController_1 = require("./userFastifyController");
const userFastifyRoutes_1 = require("./userFastifyRoutes");
const userPrismaRepository_1 = require("../../../../packages/v1/modules/user/infra/repositories/userPrismaRepository");
const CreateUserUseCase_1 = require("../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase");
const GetUserUseCase_1 = require("../../../../packages/v1/modules/user/application/usecases/GetUserUseCase");
const UpdateUserUseCase_1 = require("../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase");
const DeleteUserUseCase_1 = require("../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase");
const ListUsersUseCase_1 = require("../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase");
class UserFastifyFactory {
    makeRepository() {
        return new userPrismaRepository_1.UserPrismaRepository();
    }
    makeController() {
        const repository = this.makeRepository();
        const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(repository);
        const getUserUseCase = new GetUserUseCase_1.GetUserUseCase(repository);
        const updateUserUseCase = new UpdateUserUseCase_1.UpdateUserUseCase(repository);
        const deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(repository);
        const listUsersUseCase = new ListUsersUseCase_1.ListUsersUseCase(repository);
        return new userFastifyController_1.UserFastifyController(createUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase, listUsersUseCase);
    }
    makeRoutes() {
        const controller = this.makeController();
        return new userFastifyRoutes_1.UserFastifyRoutes(controller);
    }
    registerRoutes(app) {
        const routes = this.makeRoutes();
        routes.registerRoutes(app);
        return Promise.resolve();
    }
}
exports.UserFastifyFactory = UserFastifyFactory;
/*
import { IUserFactory } from "../../../contracts/users/IUserFactory";
import { IHttpRoutes } from "../../../contracts/IHttpRoutes";
import { UserFastifyController } from "./userFastifyController";
import { UserFastifyRoutes } from "./userFastifyRoutes";

import { UserPrismaRepository } from "../../../../packages/v1/modules/user/infra/repositories/userPrismaRepository";
import { CreateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase";
import { GetUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/GetUserUseCase";
import { UpdateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase";
import { ListUsersUseCase } from "../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase";

export class UserFastifyFactory implements IUserFactory {
  makeRepository() {
    return new UserPrismaRepository();
  }

  makeController() {
    const repository = this.makeRepository();
    const createUserUseCase = new CreateUserUseCase(repository);
    const getUserUseCase = new GetUserUseCase(repository);
    const updateUserUseCase = new UpdateUserUseCase(repository);
    const deleteUserUseCase = new DeleteUserUseCase(repository);
    const listUsersUseCase = new ListUsersUseCase(repository);

    return new UserFastifyController(
      createUserUseCase,
      getUserUseCase,
      updateUserUseCase,
      deleteUserUseCase,
      listUsersUseCase
    );
  }

  makeRoutes(): IHttpRoutes {
    const controller = this.makeController();
    return new UserFastifyRoutes(controller);
  }

  registerRoutes(app: any): Promise<void> {
    const routes = this.makeRoutes();
    routes.registerRoutes(app);
    return Promise.resolve();
  }

}
*/ 
