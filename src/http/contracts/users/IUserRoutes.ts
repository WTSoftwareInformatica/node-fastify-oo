export interface IUserRoutes<TApp = any> {
  createUserRoute(): void;
  getUserByIdRoute(): void;
  updateUserRoute(): void;
  deleteUserRoute(): void;
  listUsersRoute(): void;
  registerUserRoutes(): void;
}