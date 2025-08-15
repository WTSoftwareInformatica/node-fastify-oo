import { FastifyInstance } from 'fastify';
import { IHttpRoutes } from '../../../contracts/IHttpRoutes';
import { RootController } from './rootFastifyController';

export class RootFastifyRoutes implements IHttpRoutes<FastifyInstance> {
  registerRoutes(app: FastifyInstance): void {
    const controller = new RootController();
    app.get('/', async (req, res) => {
      const result = await controller.handle({
        params: req.params,
        query: req.query,
        body: undefined,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
  }
}
