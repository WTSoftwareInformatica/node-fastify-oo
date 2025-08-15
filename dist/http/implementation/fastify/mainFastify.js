"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainFastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const routesFastify_1 = require("./routesFastify");
class mainFastify {
    async initialize() {
        const app = (0, fastify_1.default)({ logger: true });
        const routes = new routesFastify_1.RoutesFastify();
        routes.registerRoutes(app);
        return app;
    }
}
exports.mainFastify = mainFastify;
