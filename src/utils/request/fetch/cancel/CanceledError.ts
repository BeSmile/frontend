import { FetchRequestConfig } from '../types';

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message?: string, config?: FetchRequestConfig, request?: any) {
  console.log(message, config, request);
  this.name = 'CanceledError';
}

export default CanceledError;
