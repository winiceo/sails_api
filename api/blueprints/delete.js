var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * Destroy One Record
 * DELETE /:model/:id
 *
 * Destroys the single model instance with the specified `id` from the data adapter for the given model if it exists.
 */
module.exports = function (req, res) {


    return res.jsonx(req.options)

  actionUtil.parseModel(req)
    .destroy(actionUtil.requirePk(req))
    .then(function (records) {
          return res.jsonx(records)
      if (!records[0]) return res.notFound();

      return res.noContent();
    })
    .catch(res.serverError);
};
