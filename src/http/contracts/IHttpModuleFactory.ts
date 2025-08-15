import { IHttpRoutes } from './IHttpRoutes';

export interface IHttpModuleFactory {
  makeController(): any;
  makeRoutes(): IHttpRoutes;
  registerRoutes(app: any): Promise<void>;
}
