import { ApiResponseOptions } from '@nestjs/swagger';

export const CommonResponses = {
    Unauthorized: {
        status: 401,
        description: 'Unauthorized - Invalid credentials',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Invalid credentials'
                },
            }
        }
    } as ApiResponseOptions,
    InternalError: {
        status: 500,
        description: 'Internal Server Error - An unexpected error occurred',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'An unexpected error occurred'
                },
            }
        }
    } as ApiResponseOptions,
};