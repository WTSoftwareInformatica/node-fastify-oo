import { FastifyInstance } from "fastify";
import { IRootFactory } from "../../../contracts/root/IRootFactory";
import { IRootController } from "../../../contracts/root/IRootController";
import { IRootRoutes } from "../../../contracts/root/IRootRoutes";
import { RootFastifyRoutes } from "./rootFastifyRoutes";
import { RootFastifyController } from "./rootFastifyController";

export class RootFastifyFactory implements IRootFactory {
  
  makeRootController(): IRootController {
    return new RootFastifyController();
  }

  makeRootRoutes(app: FastifyInstance): IRootRoutes {
    const controller = this.makeRootController();
    return new RootFastifyRoutes(controller, app);
  }

  async registerRootRoutes(app: FastifyInstance): Promise<void> {
    const routes = this.makeRootRoutes(app);
    routes.registerRootRoutes();
    return Promise.resolve();
  }
}
