/**
 *
 * @param message
 * @param config
 * @param request
 * @constructor
 */
function CancelToken() {
    // eslint-disable-next-line no-eq-null,eqeqeq
    this.name = 'CanceledError';
}

export default CancelToken;
