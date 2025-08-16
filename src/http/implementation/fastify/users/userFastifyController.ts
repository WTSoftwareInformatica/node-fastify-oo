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
    } catch (error) {
      return { statusCode: 400, body: error };
    }
  }

  async getById(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const userPromisse = await this.getUser.execute(req.params.id);
      const user = userPromisse ? UserMapper.toDTO(userPromisse) : null;
      return { statusCode: 200, body: user };
    } catch (error) {
      return { statusCode: 400, body: error };
    }
  }

  async update(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      return { statusCode: 200, body: UserMapper.toDTO(user) };
    } catch (error) {
      return { statusCode: 400, body: error };
    }
  }

  async delete(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this.deleteUser.execute(req.params.id);
      return { statusCode: 204, body: { message: 'User deleted successfully' } };
    } catch (error) {
      return { statusCode: 400, body: error };
    }
  }

  async list(_: IHttpRequest): Promise<IHttpResponse> {
    const users = await this.listUsers.execute();
    return { statusCode: 200, body: users.map(UserMapper.toDTO) };
  }
}
