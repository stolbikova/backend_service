import { Application, NextFunction, Request, Response } from 'express';
import BaseApi from '../BaseApi';
import { IGetGroupResponse, IDeleteGroupResponse, IGetGroupsResponse, IPostGroupResponse, IPostGroupRequest } from './group.types';
import GroupModel from './group.model';

/**
 * Group controller
 */
export default class GroupController extends BaseApi {

    private basePath: string;
    private model: GroupModel;

    /**
     * 
     * @param basePath 
     */
    constructor(basePath: string) {
        super();
        this.model = new GroupModel();
        this.basePath = basePath;
    }

    /**
     * 
     * @param express 
     */
    public register(express: Application): void {
        express.use(this.basePath, this.router);
        this.router.post('/:group/:id', this.postGroup);
        this.router.delete('/:group/:id', this.removeGroup);
        this.router.get('/', this.getGroups);
        this.router.get('/:group', this.getGroup);
    }

    public postGroup = (req: IPostGroupRequest, res: Response, next: NextFunction): void => {
        try {
            const { id, group } = req.params;
            const {data: {meta}} = req.body;
            let modelRes;
            if (this.model.has(group, id)) {
                modelRes = this.model.update(
                    {
                        id,
                        updatedAt: new Date().getTime()
                    }
                )
            } else {
                modelRes = this.model.create(
                    { id, updatedAt: new Date().getTime(), createdAt: new Date().getTime(), group, meta }
                )
            }

            const response: IPostGroupResponse = {
                data: 'Post client instance',
                success: modelRes
            };
            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }

    public removeGroup = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const {id, group} = req.params;
            const modelRes = this.model.delete({ id, group });
            const response: IDeleteGroupResponse = {
                data: 'Deleted client instance',
                success: modelRes
            };
            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }

    public getGroups = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const modelRes = this.model.getAll();
            const response: IGetGroupsResponse = {
                data: modelRes
            };
            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }

    public getGroup = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const modelRes = this.model.get({ group: req.params.group });
            const response: IGetGroupResponse = {
                data: modelRes
            };
            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }
}
