import 'jest';
import express from 'express';
import request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('group integration tests', () => {
    let app: express.Application;
    const contentType: string = JSON.parse(process.env.APPLY_ENCRYPTION) ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8';

    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });


    it('get all instances of group', async () => {
        await request(app)
            .get('/api/group/particle-detector')
            .set('Accept', 'application/json')
            .expect('Content-Type', contentType)
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(StatusCodes.OK);
    });

    it('get all client instances of all groups', async () => {
        await request(app)
            .get('/api/group/')
            .set('Accept', 'application/json')
            .expect('Content-Type', contentType)
            .expect(StatusCodes.OK);
    });

    it('create client instance or update if it exists', async () => {
        await request(app)
            .post('/api/group/particle-detector/e335175a-eace-4a74-b99c-c6466b6afadd')
            .set('Accept', 'application/json')
            .expect('Content-Type', contentType)
            .send({ data: {
                "meta": {
                    "foo": 13
                }
            } })
            .expect(StatusCodes.OK);
    });

    it('delete client instance', async () => {
        await request(app)
            .delete('/api/group/particle-detector/e335175a-eace-4a74-b99c-c6466b6afadd')
            .set('Accept', 'application/json')
            .expect('Content-Type', contentType)
            .expect(StatusCodes.OK);
    });

});
