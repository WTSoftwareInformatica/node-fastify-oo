export interface IHttpRoutes<TApp = any> {
  registerRoutes(app: TApp): void | Promise<void>;
}
