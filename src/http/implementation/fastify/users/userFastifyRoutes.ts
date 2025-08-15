import { FastifyInstance } from 'fastify';
import { IUserController } from '../../../contracts/users/IUserController';
import { IUserRoutes } from '../../../contracts/users/IUserRoutes';

export class UserFastifyRoutes implements IUserRoutes<FastifyInstance> {
  constructor(private readonly controller: IUserController,
              private readonly app: FastifyInstance) {}

  createUserRoute(): void {
    this.app.post('/users', async (req, res) => {
      const result = await this.controller.create({
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
  }

  getUserByIdRoute(): void {
    this.app.get('/users/:id', async (req, res) => {
      const result = await this.controller.getById({
        params: req.params,
        query: req.query,
        body: undefined,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
  }

  updateUserRoute(): void | Promise<void> {
    this.app.put('/users/:id', async (req, res) => {
      const result = await this.controller.update({
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
      
  }

  deleteUserRoute(): void | Promise<void> {
    this.app.delete('/users/:id', async (req, res) => {
      const result = await this.controller.delete({
        params: req.params,
        query: req.query,
        body: undefined,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
      
  }

  listUsersRoute(): void | Promise<void> {
    this.app.get('/users', async (req, res) => {
      const result = await this.controller.list({
        params: req.params,
        query: req.query,
        body: undefined,
        headers: req.headers
      });
      res.status(result.statusCode).send(result.body);
    });
  }
      
  registerUserRoutes(): void {
    this.createUserRoute();
    this.getUserByIdRoute();
    this.updateUserRoute();
    this.deleteUserRoute();
    this.listUsersRoute(); 
  }

}