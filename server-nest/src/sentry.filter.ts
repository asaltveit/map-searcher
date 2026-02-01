import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import * as Sentry from "@sentry/nestjs";

/**
 * Global exception filter that captures all errors and sends them to Sentry
 * before passing them to the default NestJS exception handler.
 */
@Catch()
export class SentryFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Capture exception in Sentry
    Sentry.captureException(exception);

    // Pass to default NestJS exception handler
    super.catch(exception, host);
  }
}
