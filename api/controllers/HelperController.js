/**
 * HelpController
 *
 * @description :: Server-side logic for managing helps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
module.exports = {
    delete: function (req, res) {
        var controller = req.param('controller');
        req.options.controller = controller;
        //return res.jsonx(req.options)
        actionUtil.parseModel(req)
            .destroy(actionUtil.requirePk(req))
            .then(function (records) {

                if (!records[0]) return res.serverError([], 1, '记录不存在');

                return res.ok(records, 0, '删除成功');
            })
            .catch(res.serverError);
    },
    /**
     * @api {get} /helper/getjob 获取职位名称
     * @apiDescription 职位名称直接系统定义
     * @apiName getJobs
     * @apiGroup Helper

     * @apiSampleRequest /v1/helper/getjob
     */

    getjob: function (req, res) {
        Setting.findOne({where: {key: "job"}})
            .exec(function (err, obj) {

                if (err) return res.fail(err);
                if (!obj) return res.fail('', 1, '记录不存在');
                res.success(obj.value);
            })
    },
    /**
     * @api {get} /helper/getlevel 获取职位名称
     * @apiDescription 职位名称直接系统定义
     * @apiName getLevel
     * @apiGroup Helper

     * @apiSampleRequest /v1/helper/getlevel
     */
    getlevel: function (req, res) {
        Setting.findOne({where: {key: "level"}})
            .exec(function (err, obj) {

                if (err) return res.fail(err);
                if (!obj) return res.fail('', 1, '记录不存在');
                res.success(obj.value);
            })
    },
    /**
     * @api {get} /helper/getrole 获取角色名称
     * @apiDescription 获取角色
     * @apiName getRole
     * @apiGroup Helper

     * @apiSampleRequest /v1/helper/getrole
     */

    getrole: function (req, res) {

        Setting.findOne({where: {key: "role"}})
            .exec(function (err, obj) {

                if (err) return res.fail(err);
                if (!obj) return res.fail('', 1, '记录不存在');
                res.success(obj.value);
            })
    },
    init:function(req,res){
        var role={"admin": "超级管理员",
                "owener": "普通用户"
            }
        var job=[
        "局长",
        "副局长",
        "副科长",
        "副科长",
        "科员"
        ]
        var level=[
        "局级",
        "副局级",
        "副科级",
        "副科级"
        ]
         Setting.create({key:"job",value:job})
        Setting.create({key:"level",value:level})
        Setting.create({key:"role",value:role})
        res.success()
    }


};

