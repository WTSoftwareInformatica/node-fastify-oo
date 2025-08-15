import { IHttpRoutes } from './IHttpRoutes';

export interface IHttpModuleFactory {
  makeRepository(): any;
  makeController(): any;
  makeRoutes(): IHttpRoutes;
  registerRoutes(app: any): Promise<void>;
}
