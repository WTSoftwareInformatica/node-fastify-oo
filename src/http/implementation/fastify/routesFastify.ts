import { IHttpRoutes } from '../../contracts/IHttpRoutes';
import { FastifyInstance } from 'fastify';
import { RootFastifyRoutes } from './root/rootFastifyRoutes';
import { UserFastifyFactory } from './users/userFastifyFactory';

export class RoutesFastify implements IHttpRoutes<FastifyInstance> {
  registerRoutes(app: FastifyInstance): void {
    // Rota raiz (apenas para teste de rota sem controllers ou repositories)
    new RootFastifyRoutes().registerRoutes(app);

    // Módulo Users
    new UserFastifyFactory().registerRoutes(app);
  }
}