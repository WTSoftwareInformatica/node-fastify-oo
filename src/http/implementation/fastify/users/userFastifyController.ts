import { IUserController } from '../../../contracts/users/IUserController';
import { IHttpRequest } from '../../../contracts/IHttpRequest';
import { IHttpResponse } from '../../../contracts/IHttpResponse';
import { CreateUserUseCase } from '../../../../packages/v1/modules/user/application/usecases/CreateUserUseCase';
import { GetUserUseCase } from '../../../../packages/v1/modules/user/application/usecases/GetUserUseCase';
import { UpdateUserUseCase } from '../../../../packages/v1/modules/user/application/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../../../packages/v1/modules/user/application/usecases/DeleteUserUseCase';
import { ListUsersUseCase } from '../../../../packages/v1/modules/user/application/usecases/ListUsersUseCase';

export class UserFastifyController implements IUserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly listUsers: ListUsersUseCase
  ) {}

  async create(req: IHttpRequest): Promise<IHttpResponse> {
    const user = await this.createUser.execute(req.body);
    return { statusCode: 201, body: user };
  }

  async getById(req: IHttpRequest): Promise<IHttpResponse> {
    const user = await this.getUser.execute(req.params.id);
    return { statusCode: 200, body: user };
  }

  async update(req: IHttpRequest): Promise<IHttpResponse> {
    const user = await this.updateUser.execute(req.params.id, req.body);
    return { statusCode: 200, body: user };
  }

  async delete(req: IHttpRequest): Promise<IHttpResponse> {
    await this.deleteUser.execute(req.params.id);
    return { statusCode: 204, body: null };
  }

  async list(_: IHttpRequest): Promise<IHttpResponse> {
    const users = await this.listUsers.execute();
    return { statusCode: 200, body: users };
  }
}
