import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

export interface IHttpController {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
