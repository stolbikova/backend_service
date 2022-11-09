import GroupModel from "./group.model";
import logger from '../../lib/logger';


export const checkClients = async (groupModel): Promise<any> => {
    const expired = await groupModel.getExpired(Number(process.env.EXPIRED_TIME_LIMIT));

    logger.info('Expired', expired);


    if (expired.length !== 0) {
        expired.map(async ({id, group}) => {
            await groupModel.delete({
                id, group
            });
        })
    }
}