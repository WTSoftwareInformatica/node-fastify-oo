export interface IHttpRoutes<TApp = any> {
  registerRoutes(app: TApp, jwtservice: any, redisService: any): void | Promise<void>;
}
