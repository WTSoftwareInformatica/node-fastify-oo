import { IRootController } from "./IRootController";
import { IRootRoutes } from "./IRootRoutes";

export interface IRootFactory {
  makeRootController(): IRootController;
  makeRootRoutes(app: any): IRootRoutes;
  registerRootRoutes(app: any): Promise<void>;
}
