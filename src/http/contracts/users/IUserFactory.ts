import { IUserRepository } from '../../../packages/v1/modules/user/application/contracts/IUserRepository';
import { IUserController } from './IUserController';
import { IUserRoutes } from './IUserRoutes';

export interface IUserFactory {
  makeUserRepository(): IUserRepository;
  makeUserController(): IUserController;
  makeUserRoutes(app: any): IUserRoutes;
  registerUserRoutes(app: any): Promise<void>;
}
