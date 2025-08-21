import { IUserController } from "../../../contracts/users/IUserController";
import { IHttpRequest } from "../../../contracts/IHttpRequest";
import { IHttpResponse } from "../../../contracts/IHttpResponse";

import { CreateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase";
import { GetUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/GetUserUseCase";
import { UpdateUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase";
import { ListUsersUseCase } from "../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase";
import { UserMapper } from "../../../../packages/v1/modules/user/application/mappers/UserMapper";

export class UserFastifyController implements IUserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly listUsers: ListUsersUseCase
  ) {}

  async create(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.createUser.execute(req.body);
      return { statusCode: 201, body: UserMapper.toDTO(user) };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  async getById(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.getUser.execute(req.params.id);
      return {
        statusCode: user ? 200 : 404,
        body: user ? UserMapper.toDTO(user) : { error: "User not found" },
      };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  async update(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      return { statusCode: 200, body: UserMapper.toDTO(user) };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  async delete(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this.deleteUser.execute(req.params.id);
      return { statusCode: 204, body: null };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  async list(_: IHttpRequest): Promise<IHttpResponse> {
    try {
      const users = await this.listUsers.execute();
      return { statusCode: 200, body: users.map(UserMapper.toDTO) };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }
}
