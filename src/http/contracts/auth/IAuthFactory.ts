import { IAuthController } from "./IAuthController";
import { IAuthRoutes } from "./IAuthRoutes";

export interface IAuthFactory {
  makeAuthController(): IAuthController;
  makeAuthRoutes(app: any): IAuthRoutes;
  registerAuthRoutes(app: any): Promise<void>;
}
