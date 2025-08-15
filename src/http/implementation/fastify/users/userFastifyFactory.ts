import { IHttpModuleFactory } from "../../../contracts/IHttpModuleFactory";
import { IHttpRoutes } from "../../../contracts/IHttpRoutes";
import { UserFastifyController } from "./userFastifyController";
import { UserFastifyRoutes } from "./userFastifyRoutes";

import { UserPrismaRepository } from "../../../../packages/v1/modules/user/infra/repositories/userPrismaRepository";
import { CreateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase";
import { GetUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/GetUserUseCase";
import { UpdateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase";
import { ListUsersUseCase } from "../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase";

export class UserFastifyFactory implements IHttpModuleFactory {
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