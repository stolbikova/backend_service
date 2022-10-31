import { Request } from "express";

export type Meta = {
    foo: number;
}
export type Client = {
    id: string;
    group: string;
    // first registered heartbeat in ms
    createdAt: number; 
    // last registered heartbeat in ms
    updatedAt: number;
    meta?: {
        foo: number
    }
}

export interface IGetGroupResponse {
    data: Client [];
}
export interface IPostGroupResponse {
    data: string;
    success: boolean;
}
export interface IDeleteGroupResponse {
    data: string;
    success: boolean;
}
export interface IGetGroupsResponse {
    data: Client [];
}
export interface IPostGroupRequest extends Request {
    "meta": {                                     
        "foo": number
    }
}