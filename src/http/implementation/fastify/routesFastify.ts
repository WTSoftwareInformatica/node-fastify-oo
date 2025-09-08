import { IHttpRoutes } from '../../contracts/IHttpRoutes';
import { FastifyInstance } from 'fastify';
import { UserFastifyFactory } from './users/userFastifyFactory';
import { RootFastifyFactory } from './root/rootFastifyFactory';
import { AuthFastifyFactory } from './auth/authFastifyFactory';

export class RoutesFastify implements IHttpRoutes<FastifyInstance> {
  registerRoutes(app: FastifyInstance): void {
    // Rota raiz (apenas para teste de rota sem controllers ou repositories)
    new RootFastifyFactory().registerRootRoutes(app);

    // Módulo Auth
    new AuthFastifyFactory().registerAuthRoutes(app);

    // Módulo Users
    new UserFastifyFactory().registerUserRoutes(app);
  }
}