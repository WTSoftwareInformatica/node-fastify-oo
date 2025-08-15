import { IUserFactory } from "../../../contracts/users/IUserFactory";

import { UserFastifyController } from "./userFastifyController";
import { UserFastifyRoutes } from "./userFastifyRoutes";

import { CreateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase";
import { GetUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/GetUserUseCase";
import { UpdateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase";
import { ListUsersUseCase } from "../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase";

import { UserPrismaRepository } from "../../../../packages/v1/modules/user/infra/repositories/userPrismaRepository";
import { FastifyInstance } from "fastify";

export class UserFastifyFactory implements IUserFactory {

  makeUserRepository() {
    return new UserPrismaRepository();
  }
  
  makeUserController() {
    const repository = this.makeUserRepository();
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

  makeUserRoutes(app: FastifyInstance) {
    const controller = this.makeUserController();
    return new UserFastifyRoutes(controller, app);      
  }

  registerUserRoutes(app: any): Promise<void> {
    const routes = this.makeUserRoutes(app);
    routes.registerUserRoutes();
    return Promise.resolve();
  }

}