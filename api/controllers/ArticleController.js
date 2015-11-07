/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * Destroy One Record
 * DELETE /:model/:id
 *
 * Destroys the single model instance with the specified `id` from the data adapter for the given model if it exists.
 */


module.exports = {
    open:function(req,res){
        return res.jsonx(["sdf"])
    },
    delete:function(req,res){
        return res.jsonx("asdfad")
        actionUtil.parseModel(req)
            .destroy(actionUtil.requirePk(req))
            .then(function (records) {

                if (!records[0]) return res.notFound();

                return res.noContent();
            })
            .catch(res.serverError);
    }
    //_config: {
    //
    //    blueprints: {
    //        actions: true,
    //        rest: false,
    //        shortcuts: false
    //    }
    //}
};

