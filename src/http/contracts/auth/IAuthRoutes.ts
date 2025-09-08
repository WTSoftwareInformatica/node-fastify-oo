export interface IAuthRoutes {
  loginRoute(): void;
  logoutRoute(): void;
  refreshTokenRoute(): void;
  registerAuthRoutes(): void;
}