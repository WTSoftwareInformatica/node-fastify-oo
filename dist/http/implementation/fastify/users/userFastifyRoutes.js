"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFastifyRoutes = void 0;
class UserFastifyRoutes {
    constructor(controller) {
        this.controller = controller;
    }
    registerRoutes(app) {
        app.post('/users', async (req, res) => {
            const result = await this.controller.create({
                params: req.params,
                query: req.query,
                body: req.body,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
        app.get('/users/:id', async (req, res) => {
            const result = await this.controller.getById({
                params: req.params,
                query: req.query,
                body: undefined,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
        app.put('/users/:id', async (req, res) => {
            const result = await this.controller.update({
                params: req.params,
                query: req.query,
                body: req.body,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
        app.delete('/users/:id', async (req, res) => {
            const result = await this.controller.delete({
                params: req.params,
                query: req.query,
                body: undefined,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
        app.get('/users', async (req, res) => {
            const result = await this.controller.list({
                params: req.params,
                query: req.query,
                body: undefined,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
    }
}
exports.UserFastifyRoutes = UserFastifyRoutes;
