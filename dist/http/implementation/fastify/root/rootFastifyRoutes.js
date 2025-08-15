"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootFastifyRoutes = void 0;
const rootFastifyController_1 = require("./rootFastifyController");
class RootFastifyRoutes {
    registerRoutes(app) {
        const controller = new rootFastifyController_1.RootController();
        app.get('/', async (req, res) => {
            const result = await controller.handle({
                params: req.params,
                query: req.query,
                body: undefined,
                headers: req.headers
            });
            res.status(result.statusCode).send(result.body);
        });
    }
}
exports.RootFastifyRoutes = RootFastifyRoutes;
