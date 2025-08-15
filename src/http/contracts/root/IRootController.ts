import { IHttpRequest } from '../IHttpRequest';
import { IHttpResponse } from '../IHttpResponse';

export interface IRootController {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
