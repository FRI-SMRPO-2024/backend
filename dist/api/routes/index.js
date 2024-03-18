"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const project_routes_1 = __importDefault(require("./project.routes"));
const user_project_routes_1 = __importDefault(require("./user-project.routes"));
const sprint_routes_1 = __importDefault(require("./sprint.routes"));
const story_routes_1 = __importDefault(require("./story.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/project', project_routes_1.default);
router.use('/user-project', user_project_routes_1.default);
router.use('/sprint', sprint_routes_1.default);
router.use('/story', story_routes_1.default);
router.use('/task', task_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map