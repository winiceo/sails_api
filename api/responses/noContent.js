/**
 * 204 (NoContent) Response
 *
 * General status code. Most common code used to indicate delete success.
 * The actual response will depend on the request method used.
 */

module.exports = function (data, code, message, root) {
    var response = _.assign({
        err_code: code || 0,
        err_msg: message || '',
        data: data || {}
    }, root);

    this.req._sails.log.silly('Sent (204 NoContent)\n', response);

    this.res.status(204);
    this.res.jsonx(response);
};
