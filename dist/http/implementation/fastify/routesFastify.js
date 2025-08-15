"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesFastify = void 0;
const rootFastifyRoutes_1 = require("./root/rootFastifyRoutes");
const userFastifyFactory_1 = require("./users/userFastifyFactory");
class RoutesFastify {
    registerRoutes(app) {
        // Rota raiz (apenas para teste de rota sem controllers ou repositories)
        new rootFastifyRoutes_1.RootFastifyRoutes().registerRoutes(app);
        // Módulo Users
        new userFastifyFactory_1.UserFastifyFactory().registerRoutes(app);
    }
}
exports.RoutesFastify = RoutesFastify;
