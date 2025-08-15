import { IHttpController } from '../../../contracts/IHttpController';
import { IHttpRequest } from '../../../contracts/IHttpRequest';
import { IHttpResponse } from '../../../contracts/IHttpResponse';

export class RootController implements IHttpController {
  async handle(_: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 200,
      body: { message: 'Alô mundo' },
    };
  }
}
