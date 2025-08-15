import { FastifyInstance } from "fastify";
import { IRootRoutes } from "../../../contracts/root/IRootRoutes";
import { IRootController } from "../../../contracts/root/IRootController";

export class RootFastifyRoutes implements IRootRoutes {
  constructor(
    private readonly controller: IRootController,
    private readonly app: FastifyInstance
  ) {}

  createRootRoute(): void {
    this.app.get("/", async (req, res) => {
      const result = await this.controller.handle({
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
      });
      res.status(result.statusCode).send(result.body);
    });
  }

  registerRootRoutes(): void {
    this.createRootRoute;
  }
}
