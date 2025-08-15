import { IHttpRequest } from '../../../contracts/IHttpRequest';
import { IHttpResponse } from '../../../contracts/IHttpResponse';
import { IRootController } from '../../../contracts/root/IRootController';

export class RootFastifyController implements IRootController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 200,
      body: { message: 'Rota Root API Node + Fastify + Prisma - Estudo de Clean Architecture + DDD + SOLID' },
    };
  }
}
