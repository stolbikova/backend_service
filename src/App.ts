import cors from 'cors';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import addErrorHandler from './middleware/error-handler';
import { checkClients } from './api/group/group.service';
import createDb from './db/db';
import GroupModel from './api/group/group.model';
import GroupController from './api/group/group.controller';

export default class App {
    public express: express.Application;

    public httpServer: http.Server;

    public db: any;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.db = await createDb({ login: process.env.DB_LOGIN, password: process.env.DB_PASSWORD, dbName: process.env.DB_NAME, dbClusterName: process.env.DB_CLUSTER_NAME });

        // global middleware like cors
        this.middleware();

        // routes
        this.express.get('/', this.basePathRoute);
        const groupModel = new GroupModel(this.db);
        const groupController: GroupController = new GroupController('/api/group', groupModel);
        groupController.register(this.express);

        // the middleware to handle error
        this.express.use(addErrorHandler);

        // Check client instances every 10s, the same server as an http server. Maybe there are advantages to use separate one.
        setInterval(async() => {
            await checkClients(groupModel);
        }, 10000);
    }

    /**
     * middlewares
     */
    private middleware(): void {
        this.express.use(helmet({ contentSecurityPolicy: false }));
        this.express.use(express.json());
        this.express.use(express.urlencoded());
        // add multiple cors options as per your use
        const corsOptions = {
            origin: ['http://localhost:8080/', 'http://example.com/', 'http://127.0.0.1:8080'],
        };
        this.express.use(cors(corsOptions));
    }

    private basePathRoute(request: express.Request, response: express.Response): void {
        response.json({ message : 'base path' });
    }
}
