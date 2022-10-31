import { Client } from '../api/group/group.types';

const clients: Client[] = function init() {
    const now = new Date().getTime();
    return [
        {
            'id': 'e335175a-eace-4a74-b99c-c6466b6afadd',
            'group': 'particle-detector',
            'createdAt': now,
            'updatedAt': now,
            'meta': {
                'foo': 1
            },
        },
        {
            'id': 'jsdgfjs',
            'group': 'particle-detector',
            'createdAt': now,
            'updatedAt': now,
            'meta': {
                'foo': 2
            }

        },
        {
            'id': 'asdasd',
            'group': 'particle-detector',
            'createdAt': now,
            'updatedAt': now,
            'meta': {
                'foo': 3
            }

        },
        {
            'id': 'qweqw',
            'group': 'particle-detector',
            'createdAt': now,
            'updatedAt': now,
            'meta': {
                'foo': 4
            }

        },
        {
            'id': 'e335175a-eace-4a74-b99c-c6466b6afadq',
            'group': 'light-detector',
            'createdAt': now,
            'updatedAt': now,
            'meta': {
                'foo': 1
            },
        },
    ];
}();

export default clients;