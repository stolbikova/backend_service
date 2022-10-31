import clients from "../../mocks/clients";
import {Meta, Client} from './group.types';

export default class GroupModel {
    constructor() {
    }

    /**
     * @desc Check wheather client instance exists or not
     * @param groupId
     * @param id
     * @return true if client instance exists, else - false
     */
    public has = (groupId: string, id: string): boolean => {
        return !!clients.find((item) => groupId === item.group && id === item.id);
    }

    /**
     * @desc Update client instance
     * @param id
     * @param updatedAt
     * @param meta
     * @param group
     * @return true if update is ok, else - false
     */
    public update = ({ id, updatedAt }: { id: string, updatedAt: number }): boolean => {
        return true;
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
    public create = (instance:
        { id: string, updatedAt: number, createdAt: number, meta?: Meta, group: string }): boolean => {
            clients.push(instance);
        return true;
    }

    /**
    * @desc Remove client instance
    * @param id
    * @param group
    * @return true if remove is ok, else - false
    */
    public delete = (
        { id, group }: { id: string; group: string }): boolean => {
            clients.filter(item => item.id === id && item.group === group);

        return true;
    }

    /**
    * @desc Get all clients
    * @return array of clients
    */
    public getAll = (): Client[] => {
        return clients;
    }

    /**
     * @desc Get clients by group id
     * @param group
     * @return clients
     */
    public get = ({ group }: { group: string}): Client [] => {
        return clients.filter(item => item.group === group );

    }

    /**
     * @desc Get clients which expired
     * @param thresholdUpdatedAt
     * @return group
     */
    public getExpired = (thresholdUpdatedAt: number): Client [] => {
        const now = new Date().getTime();
        return clients.filter(item => now - item.updatedAt > thresholdUpdatedAt);    
    }

}
