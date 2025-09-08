import { IHttpRequest } from '../IHttpRequest';
import { IHttpResponse } from '../IHttpResponse';

export interface IAuthController {
  login(req: IHttpRequest): Promise<IHttpResponse>;
  refresh(req: IHttpRequest): Promise<IHttpResponse>;
  logout(req: IHttpRequest): Promise<IHttpResponse>;
}
