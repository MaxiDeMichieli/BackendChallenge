import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { INVALID_BODY_ERROR } from 'src/core/constants/errors';

export const customValidationPipe = (): ValidationPipe =>
  new ValidationPipe({
    exceptionFactory: (errors) => {
      return new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: INVALID_BODY_ERROR,
        errors: errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.property]: Object.values(err.constraints),
          }),
          {},
        ),
      });
    },
  });
