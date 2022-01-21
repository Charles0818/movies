import { Logger } from '@nestjs/common';
import { createLogger } from '@logdna/logger';
const logdna = createLogger('497fcf00830df9b77a4f01461ea84103', {
  levels: ['info', 'warn', 'critical', 'catastrophic'],
});

const options = {
  app: 'movie-search',
};

const AppLogger = new Logger();

export class SuccessResponse {
  message: string;
  data: unknown;

  constructor(data: object = null, message = 'Process successful') {
    logdna.info(data, options);
    this.message = message;
    this.data = data;
  }

  toJSON() {
    AppLogger.log(`(LOGS) Success - ${this.message}`);

    if (this.data) {
      return {
        status: 'success',
        message: this.message,
        data: this.data,
      };
    }

    return {
      status: 'success',
      message: this.message,
    };
  }
}
