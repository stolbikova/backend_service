import * as express from 'express';
import GroupController from './api/group/group.controller';

/**
 * Here, you can register routes by instantiating the controller.
 * @param app 
 */
export default function registerRoutes(app: express.Application): void {
    const groupController: GroupController = new GroupController('/api/group');
    groupController.register(app);
}
