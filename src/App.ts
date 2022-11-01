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
        this.db = await createDb();

        // global middleware like cors
        this.middleware();

        // routes
        this.express.get('/', this.basePathRoute);
        const groupModel = new GroupModel(this.db);
        const groupController: GroupController = new GroupController('/api/group', groupModel);
        groupController.register(this.express);

        // the middleware to handle error
        this.express.use(addErrorHandler);

        // Check client instances every 5s, the same server as an http server. Maybe there are advantages to use separate one.
        setInterval(() => {
            // checkClients();
        }, 5000);
    }

    /**
     * middlewares
     */
    private middleware(): void {
        // support application/json type post data
        // support application/x-www-form-urlencoded post data
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this.express.use(helmet({ contentSecurityPolicy: false }));
        this.express.use(express.json({ limit: '100mb' }));
        this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
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
