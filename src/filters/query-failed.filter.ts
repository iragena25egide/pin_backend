import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected database error occurred.';

    // Check if it's a foreign key constraint violation (PostgreSQL code 23503)
    if ((exception as any).code === '23503') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Operation failed. This item is linked to other records and cannot be deleted.';
    } 
    // Check if it's a unique constraint violation (PostgreSQL code 23505)
    else if ((exception as any).code === '23505') {
      status = HttpStatus.CONFLICT;
      message = 'Operation failed. This item already exists (duplicate entry).';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
    });
  }
}
