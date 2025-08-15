import { IHttpRequest } from '../IHttpRequest';
import { IHttpResponse } from '../IHttpResponse';

export interface IUserController {
  create(req: IHttpRequest): Promise<IHttpResponse>;
  getById(req: IHttpRequest): Promise<IHttpResponse>;
  update(req: IHttpRequest): Promise<IHttpResponse>;
  delete(req: IHttpRequest): Promise<IHttpResponse>;
  list(req: IHttpRequest): Promise<IHttpResponse>;
}
