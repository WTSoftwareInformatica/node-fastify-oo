import Fastify, { FastifyInstance } from "fastify";
import { RoutesFastify } from "./routesFastify";
import { IHttpMain } from "../../contracts/IHttpMain";

export class mainFastify implements IHttpMain<FastifyInstance> {
  async initialize(): Promise<FastifyInstance> {
    const app = Fastify({ logger: true });

    const routes = new RoutesFastify();
    routes.registerRoutes(app);

    return app;
  }
}