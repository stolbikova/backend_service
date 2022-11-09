import { query } from "express";
import clients from "../../mocks/clients";
import {Meta, Client} from './group.types';


export default class GroupModel {
    private db: any;
    private col: any;
    constructor(db) {
        this.db = db;
        this.col = db.collection("clients");    
    }

    /**
     * @desc Check wheather client instance exists or not
     * @param group
     * @param id
     * @return true if client instance exists, else - false
     */
    public has = async (group: string, id: string): Promise<boolean> => {
        const  query = { group, id };
        const res = await this.col.findOne(query);
        return !!res;
    }

    /**
     * @desc Update client instance
     * @param id
     * @param updatedAt
     * @param meta
     * @param group
     * @return true if update is ok, else - false
     */
    public update = async ({ id, updatedAt }: { id: string, updatedAt: number }): Promise<boolean> => {
        const query = { id};
        const newvalues = { $set: { updatedAt } };
        const res = await this.col.updateOne(query, newvalues)
        return !!res;
    }

    /**
    * @desc Create client instance
    * @param id
    * @param updatedAt
    * @param createdAt
    * @param meta
    * @param group
    * @return true if create is ok, else - false
    */
    public create = async (instance:
        { id: string, updatedAt: number, createdAt: number, meta?: Meta, group: string }): Promise<boolean> => {
        const res = await this.col.insertOne(instance);
        return !!res;
    }

    /**
    * @desc Remove client instance
    * @param id
    * @param group
    * @return true if remove is ok, else - false
    */
    public delete = async (
        { id, group }: { id: string; group: string }): Promise<boolean> => {
        const query = { id, group };
        const res = await this.col.deleteOne(query);
        return res;
    }

    /**
    * @desc Get all clients
    * @return array of clients
    */
    public getAll = async (): Promise<Client[]> => {
        return await this.col.find({}).toArray();
    }

    /**
     * @desc Get clients by group id
     * @param group
     * @return clients
     */
    public get = async ({ group }: { group: string}): Promise<Client []> => {
        const  query = { group };
        const res = await this.col.find(query).toArray();
        return res;
    }

    /**
     * @desc Get clients which expired
     * @param thresholdUpdatedAt
     * @return group
     */
    public getExpired = async (thresholdUpdatedAt: number): Promise<Client []> => {
        const now = new Date().getTime();
        const  query = { updatedAt: {$lt: now - thresholdUpdatedAt} };
        const res = await this.col.find(query).toArray();
        return res;  
    }

}
